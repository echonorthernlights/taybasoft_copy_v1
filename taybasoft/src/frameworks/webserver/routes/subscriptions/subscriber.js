import logger from "../../../../infrastructure/loggers/logger.js"

import subscriberRepository from "../../../../application/repositories/subscriptions/SubscriberRepository.js"
import subscriberDbRepository from "../../../databases/postgres/repositories/subscriptions/subscriberDbRepository.js"
import subscriberController from "../../../../controllers/subscriptions/SuscriberController.js"

import userDbRepository from "../../../databases/postgres/repositories/users/userDbRepository.js"
import userRepository from "../../../../application/repositories/users/userRepository.js"

import roleRepository from "../../../../application/repositories/users/roleRepository.js"
import roleDbRepository from "../../../databases/postgres/repositories/users/roleDbRepository.js"
export default function subscriber(express) {
  const router = express.Router()
  const controller = subscriberController(
    subscriberRepository,
    subscriberDbRepository,
    userRepository,
    userDbRepository,
    roleRepository,
    roleDbRepository,

    logger
  )
  router
    .route("/")
    .post(controller.addNewSubscriber)
    .get(controller.findAllSubscribers)
  router
    .route("/:id")
    .get(controller.findSubscriber)
    .delete(controller.removeSubscriber)
    .put(controller.updateSubscriber)
  return router
}
