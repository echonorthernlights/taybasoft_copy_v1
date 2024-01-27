import bcrypt from "bcryptjs"
import AuthUseCase from "../../application/use_cases/auth/authUseCase.js"
import UserUseCase from "../../application/use_cases/users/userUseCase.js"
import tokenServices from "../../services/tokenServices.js"
import catchAsync from "../../utils/catchAsync.js"
import newError from "../../utils/newError.js"
export default function authController(
	authRepository,
	authDbRepository,
	userRepository,
	userDbRepository,
	logger
) {
	const authRepositoryIMP = authRepository(authDbRepository(), logger)
	const userRepositoryIMP = userRepository(userDbRepository(), logger)
	const authUseCase = AuthUseCase(authRepositoryIMP, logger)
	const userUseCase = UserUseCase(userRepositoryIMP, logger)

	const login = catchAsync(async (req, res, next) => {
		logger.info("____Start logging user controller____")
		const modelData = { ...req.body }
		const user = await userUseCase.findUserByEmail(modelData.email)
		if (!user || !(await bcrypt.compare(modelData.password, user.password))) {
			throw newError("Invalid email or password!", 400)
		}
		const foundSession = await authUseCase.checkUserSession(user)

		const { accessToken, refreshToken } = await authUseCase.authenticateUser(
			user
		)
		if (foundSession && foundSession !== null) {
			await authUseCase.updateUserSession(foundSession, accessToken)
		} else {
			await authUseCase.addNewUserSession(user.id, accessToken)
		}

		tokenServices.setAccessTokenCookie(res, accessToken)
		tokenServices.setRefreshTokenCookie(res, refreshToken)

		logger.info("____End logging user controller____")
		return res.json({
			msg: "User logged in successfully",
			data: {
				userId: user.id,
				email: user.email,
				fullName: `${user.firstName} ${user.lastName}`,
				role: user.Role.id,
			},
		})
	})

	const logout = catchAsync(async (req, res) => {
		logger.info("____Start logout user controller____")
		const { id: userId } = req.user
		await authUseCase.removeUserSession(userId, res)

		logger.info("____End logout user controller____")
		return res.json({
			msg: "User logged out successfully",
		})
	})

	const verifyAuthentication = catchAsync(async (req, res) => {
		logger.info("____Start verifying authentication controller____")
		let result
		if (!req.user) {
			result = res
				.status(401)
				.json({ msg: "Invalid token. Token has already expired!", status: 401 })
		} else {
			result = res.status(200).json({
				msg: "Authentication verified.",
				status: 200,
			})
		}
		logger.info("____End verifying authentication controller____")
		return result
	})

	return {
		login,
		logout,
		verifyAuthentication,
	}
}
