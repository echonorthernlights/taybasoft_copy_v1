import UserUseCase from "../../application/use_cases/users/userUseCase.js"
import catchAsync from "../../utils/catchAsync.js"
import newError from "../../utils/newError.js"
import valideUuid from "../../utils/valideUuid.js"
export default function userController(
	userRepository,
	userDbRepository,
	logger
) {
	const repository = userRepository(userDbRepository(), logger)
	const userUseCase = UserUseCase(repository, logger)

	const addNewUser = catchAsync(async (req, res, next) => {
		logger.info("____Start add new user controller____")
		const modelData = { ...req.body }
		const result = await userUseCase.addNewUser(modelData)
		logger.info("____End add new user controller____")
		return res.json({
			msg: "User added successfully",
			data: result,
		})
	})

	const findAllUsers = catchAsync(async (req, res, next) => {
		logger.info("____Start find all users controller____")
		const result = await userUseCase.findAllUsers()
		logger.info("____End find all users controller____")
		return res.json(result)
	})

	const findUser = catchAsync(async (req, res, next) => {
		logger.info("____Start find single user controller____")
		const { id } = req.params
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid user with id: ${id}`, 400)
		}
		const result = await userUseCase.findUser(id)
		if (result === null) {
			throw newError(`No user found with id: ${id}`, 404)
		}
		logger.info("____End find single user controller____")
		return res.json(result)
	})

	const findUserBySubscriberId = catchAsync(async (req, res, next) => {
		logger.info("____Start find single user by subscriber id controller____")
		const { id } = req.params

		if (!valideUuid(id.toString())) {
			throw newError(`Invalid user's  subscriber  with id: ${id}`, 400)
		}

		const result = await userUseCase.findUserBySubscriberId(id)
		if (result === null) {
			throw newError(`No user found with subscriber id: ${id}`, 404)
		}
		logger.info("____End find single user by subscriber id controller____")
		return res.json(result)
	})

	const updateUser = catchAsync(async (req, res, next) => {
		logger.info("____Start update a single user controller____")
		const { id } = req.params
		const modelData = req.body
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid user id: ${id}`, 400)
		}
		const result = await userUseCase.updateUser(id, modelData)
		logger.info("____End update role controller____")
		return res.json({ status: "User updated successfully", data: result })
	})

	const removeUser = catchAsync(async (req, res, next) => {
		logger.info("____Start remove user controller____")
		const { id } = req.params
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid user id: ${id}`, 400)
		}
		await userUseCase.removeUser(id)
		logger.info("____End remove user controller____")
		return res.json({ msg: "User removed successfully" })
	})

	return {
		addNewUser,
		findAllUsers,
		findUser,
		updateUser,
		removeUser,
		findUserBySubscriberId,
	}
}
