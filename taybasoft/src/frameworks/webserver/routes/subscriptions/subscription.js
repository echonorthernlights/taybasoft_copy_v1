import logger from "../../../../infrastructure/loggers/logger.js"

import subscriptionController from "../../../../controllers/subscriptions/SubscriptionController.js"
import subscriptionRepository from "../../../../application/repositories/subscriptions/SubscriptionRepository.js"
import subscriptionDbRepository from "../../../databases/postgres/repositories/subscriptions/subscriptionDbRepository.js"
export default function subscriptionRouter(express) {
  const router = express.Router()
  const controller = subscriptionController(
    subscriptionRepository,
    subscriptionDbRepository,
    logger
  )
  router
    .route("/")
    .post(controller.addNewSubscription)
    .get(controller.findAllSubscriptions)
  router
    .route("/:id")
    .get(controller.findSubscription)
    .delete(controller.removeSubscription)
    .put(controller.updateSubscription)
  router.route("/subscribers/:id").get(controller.findAllBySubscriberId)
  return router
}
