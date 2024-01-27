import logger from "../../../../infrastructure/loggers/logger.js"
import userController from "../../../../controllers/users/userController.js"
import userRepository from "../../../../application/repositories/users/userRepository.js"
import userDbRepository from "../../../databases/postgres/repositories/users/userDbRepository.js"

export default function roleRouter(express) {
  const router = express.Router()
  const controller = userController(userRepository, userDbRepository, logger)
  router.route("/").post(controller.addNewUser).get(controller.findAllUsers)
  router
    .route("/:id")
    .get(controller.findUser)
    .put(controller.updateUser)
    .delete(controller.removeUser)
  router.route("/subscriber/:id").get(controller.findUserBySubscriberId)

  return router
}
