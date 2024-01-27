import newError from "../../../../../utils/newError.js"
import PackModel from "../../models/subscriptions/PackModel.js"
import SubscriberModel from "../../models/subscriptions/SubscriberModel.js"
import SubscriptionModel from "../../models/subscriptions/SubscriptionModel.js"

export default function subscriptionDbRepository() {
  const create = async (subscriptionData) => {
    let result
    try {
      //const subscriber = SubscriberModel.findOne(subscriptionData.subscriber)
      const subscriber = await SubscriberModel.findOne({
        where: { id: subscriptionData.subscriber },
      })
      if (!subscriber) {
        throw newError(
          `Aucun abonné trouvé avec l'id: ${subscriptionData.subscriber}`,
          404
        )
      }
      if (subscriptionData.startDate < subscriptionData.endDate) {
        const newSubscription = new SubscriptionModel({
          subscriber: subscriptionData.subscriber,
          packId: subscriptionData.packId,
          paymentDate: subscriptionData.paymentDate,
          paymentMethod: subscriptionData.paymentMethod,
          totalAmount: subscriptionData.totalAmount,
          startDate: subscriptionData.startDate,
          endDate: subscriptionData.endDate,
          status: subscriptionData.status,
        })
        if (subscriptionData.status === "active") {
          subscriber.subscriptionStatus = true
        }
        result = await newSubscription.save()
        await subscriber.save()
      } else {
        throw newError(
          "La date de début doit être inférieure à la date de fin.",
          500
        )
      }
    } catch (error) {
      throw newError(error.message, 500)
    }
    return result
  }

  const findAll = async () => {
    return await SubscriptionModel.findAll()
  }

  const findAllBySubscriberId = async (subscriberId) => {
    try {
      const result = await SubscriptionModel.findAll({
        where: { subscriber: subscriberId },
        include: [
          {
            model: PackModel,
            attributes: ["designation", "nbrProjects", "nbrClients"],
          },
        ],
      })
      return result
    } catch (error) {
      throw newError(error.message, 500)
    }
  }
  const findById = async (id) => {
    return await SubscriptionModel.findByPk(id)
  }

  const update = async (id, subscriptionEntity) => {
    try {
      const updatedSubscription = {
        subscriber: subscriptionEntity.subscriber,
        packId: subscriptionEntity.packId,
        startDate: subscriptionEntity.startDate,
        endDate: subscriptionEntity.endDate,
        paymentDate: subscriptionEntity.paymentDate,
        paymentMethod: subscriptionEntity.paymentMethod,
        totalAmount: subscriptionEntity.totalAmount,
      }
      console.log(updatedSubscription)
      if (
        (await SubscriptionModel.update(updatedSubscription, {
          where: { id },
        })) > 0
      ) {
        return await findById(id)
      } else {
        throw newError(`No subscription found with the id : ${id}`, 404)
      }
    } catch (error) {
      throw newError(error.message, 500)
    }
  }

  const remove = async (id) => {
    return await SubscriptionModel.destroy({ where: { id, status: "pending" } })
  }

  return { create, findAll, findById, remove, update, findAllBySubscriberId }
}
