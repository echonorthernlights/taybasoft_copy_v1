// subscriptionActivationCron.js

import cron from "node-cron"
import SubscriptionModel from "../../frameworks/databases/postgres/models/subscriptions/SubscriptionModel.js"
import { Sequelize } from "sequelize"

// Assuming you already have sequelize configured
//const sequelize = new Sequelize(/* your database connection details */)

async function activateSubscriptions() {
  try {
    const currentDate = new Date()

    // Retrieve subscribers with subscriptions
    const subscribersWithSubscriptions = await SubscriptionModel.findAll({
      attributes: [
        "subscriber", // The column you want to select
        [Sequelize.fn("COUNT", "subscriber"), "subscriberCount"], // Optionally, you can count occurrences
      ],
      group: ["subscriber"],
    })

    // Iterate through each subscriber
    for (const { subscriber } of subscribersWithSubscriptions) {
      // Check if the subscriber has an active subscription
      const isActive = await SubscriptionModel.findOne({
        where: {
          subscriber: subscriber,
          status: "active",
        },
      })

      if (isActive) {
        // If the subscriber has an active subscription, skip activation
        console.log(
          `Subscriber ${subscriber} already has an active subscription. Skipping activation.`
        )
        continue
      }

      // Find subscriptions with a start date less than or equal to the current date
      const subscriptionsToActivate = await SubscriptionModel.findAll({
        where: {
          subscriber: subscriber,
          startDate: {
            [Sequelize.Op.gte]: currentDate,
          },
          status: "pending",
        },
      })

      // Activate the found subscriptions
      await Promise.all(
        subscriptionsToActivate.map((subscription) =>
          subscription.update({ status: "active" })
        )
      )

      console.log(
        `${subscriptionsToActivate.length} subscriptions activated for subscriber ${subscriber}.`
      )
    }
  } catch (error) {
    console.error("Error activating subscriptions:", error)
  }
}

// Schedule a job to run every minute (for testing purposes)
const subscriptionsActivationTask = cron.schedule(
  "0 0 * * *",
  activateSubscriptions
)

// You can export any functions or objects if needed
export default subscriptionsActivationTask
