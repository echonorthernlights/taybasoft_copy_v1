import UserEntity from "../../../entities/users/UserEntity.js"
import newError from "../../../utils/newError.js"

export default function userUseCase(userRepository, logger) {
	const addNewUser = async (modelData) => {
		logger.info("____Start create new user use case____")
		logger.info("start extracting user model data")
		const { firstName, lastName, email, password, role, subscriber, status } =
			modelData
		logger.info("end extracting role model data")
		logger.info("start creating role entity")
		const newUser = new UserEntity(
			firstName,
			lastName,
			email,
			password,
			role,
			subscriber,
			status
		)
		logger.info("end creating user entity")
		const createdUser = await userRepository.create(newUser)
		logger.info(`User created with id : ${createdUser.id}`)
		logger.info("____ End create new user use case____")
		return createdUser
	}

	const addNewUserAdmin = async (modelData, transaction) => {
		logger.info("____Start create new user use case____")
		logger.info("start extracting user model data")
		const { firstName, lastName, email, password, role, subscriber, status } =
			modelData
		logger.info("end extracting role model data")
		logger.info("start creating role entity")
		const newUser = new UserEntity(
			firstName,
			lastName,
			email,
			password,
			role,
			subscriber,
			status
		)
		logger.info("end creating user entity")
		const createdUser = await userRepository.createAdmin(newUser, transaction)
		logger.info(`User created with id : ${createdUser.id}`)
		logger.info("____ End create new user use case____")
		return createdUser
	}

	const findAllUsers = async () => {
		logger.info("____Start get all users use case____")
		const result = await userRepository.findAll()
		logger.info("____End get all users use case____")
		return result
	}

	const findUser = async (userId) => {
		logger.info("____Start get user by id use case____")
		const result = await userRepository.findById(userId)
		logger.info("____End get user by id use case____")
		return result
	}

	const findUserByEmail = async (email) => {
		logger.info("____Start get user by email use case____")
		const result = await userRepository.findByEmail(email)
		logger.info("____End get user by email use case____")
		return result
	}

	const findUserBySubscriberId = async (subscriberId) => {
		logger.info("____Start get user by subscriber id use case____")
		console.log(subscriberId)
		const result = await userRepository.findBySubscriberId(subscriberId)
		logger.info("____End get user by subscriber id use case____")
		return result
	}

	const updateUser = async (userId, modelData) => {
		logger.info("____Start updating user use case____")
		const existsUser = await userRepository.findById(userId)
		if (!existsUser || existsUser === null) {
			throw newError(`No user found with id: ${userId}`, 404)
		}
		const { firstName, lastName, email, password, role, subscriber, status } =
			modelData
		const updatedUser = new UserEntity(
			firstName,
			lastName,
			email,
			password,
			role,
			subscriber,
			status
		)
		await userRepository.update(userId, updatedUser)
		const result = await userRepository.findById(userId)
		logger.info("____End updating user use case____")
		return result
	}

	const removeUser = async (userId) => {
		logger.info("____Start removing user use case____")
		const existsUser = await userRepository.findById(userId)
		if (!existsUser || existsUser === null) {
			throw newError(`No user found with id: ${userId}`, 404)
		}
		const result = await userRepository.remove(userId)
		logger.info("____End removing user use case____")
		return result
	}

	return {
		addNewUser,
		findAllUsers,
		findUser,
		updateUser,
		removeUser,
		findUserByEmail,
		findUserBySubscriberId,
		addNewUserAdmin,
	}
}
