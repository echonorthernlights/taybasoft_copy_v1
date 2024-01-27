import logger from "../../../../infrastructure/loggers/logger.js";
import roleController from "../../../../controllers/users/roleController.js";
import roleDbRepository from "../../../databases/postgres/repositories/users/roleDbRepository.js";
import roleRepository from "../../../../application/repositories/users/roleRepository.js";

export default function roleRouter(express) {
  const router = express.Router();
  const controller = roleController(roleRepository, roleDbRepository, logger);
  router.route("/").post(controller.addNewRole).get(controller.findAllRoles);
  router
    .route("/:id")
    .get(controller.findRole)
    .put(controller.updateRole)
    .delete(controller.removeRole);

  return router;
}
