import authRepository from "../../../../application/repositories/auth/authRepository.js"
import userRepository from "../../../../application/repositories/users/userRepository.js"
import authController from "../../../../controllers/auth/authController.js"
import logger from "../../../../infrastructure/loggers/logger.js"
import authDbRepository from "../../../databases/postgres/repositories/auth/authDbRepository.js"
import userDbRepository from "../../../databases/postgres/repositories/users/userDbRepository.js"
import { protect } from "../../middlewares/authMiddleware.js"

export default function authRouter(express) {
	const router = express.Router()
	const controller = authController(
		authRepository,
		authDbRepository,
		userRepository,
		userDbRepository,
		logger
	)
	router.route("/auth").post(controller.login)
	router.route("/logout").post(protect, controller.logout)
	router
		.route("/verifyAuthentication")
		.get(protect, controller.verifyAuthentication)

	return router
}
