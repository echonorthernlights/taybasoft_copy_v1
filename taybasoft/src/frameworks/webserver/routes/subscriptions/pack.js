import packRepository from "../../../../application/repositories/subscriptions/PackRepository.js"
import packController from "../../../../controllers/subscriptions/PackController.js"
import logger from "../../../../infrastructure/loggers/logger.js"
import packDbRepository from "../../../databases/postgres/repositories/subscriptions/packDbRepository.js"
import { protect } from "../../middlewares/authMiddleware.js"
export default function packRouter(express) {
  const router = express.Router()
  const controller = packController(packRepository, packDbRepository, logger)
  router
    .route("/")
    .post(controller.addNewPack)
    .get(protect, controller.findAllPacks)
  router
    .route("/:id")
    .get(controller.findPack)
    .put(controller.updatePack)
    .delete(controller.removePack)

  return router
}
