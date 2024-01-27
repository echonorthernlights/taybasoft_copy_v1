export default function userRepository(repository, logger) {
	const create = async (user) => {
		logger.info("____Start saving new user to database____")
		const result = await repository.create(user)
		logger.info(`user persisted in database with id : ${result.id}`)
		logger.info(`____End saving new user to database____`)
		return result
	}

	const createAdmin = async (user, transaction) => {
		logger.info("____Start saving new user to database____")
		const result = await repository.createAdmin(user, transaction)
		logger.info(`user persisted in database with id : ${result.id}`)
		logger.info(`____End saving new user to database____`)
		return result
	}

	const findAll = async () => {
		logger.info("____Start getting users from database____")
		const result = await repository.findAll()
		logger.info(`____End getting users from database____`)
		return result
	}

	const findById = async (userId) => {
		logger.info(`____Start finding user with id: ${userId} from database____`)
		const result = await repository.findById(userId)
		logger.info(`____End finding user from database____`)
		return result
	}

	const findByEmail = async (email) => {
		logger.info(`____Start finding user with email: ${email} from database____`)
		const result = await repository.findByEmail(email)
		logger.info(`____End finding user from database____`)
		return result
	}

	const update = async (userId, updateUser) => {
		logger.info(`____Start updating user with id: ${userId} from database____`)
		const result = await repository.update(userId, updateUser)
		logger.info(`____End updating user from database____`)
		return result
	}

	const remove = async (userId) => {
		logger.info(`____Start removing user with id: ${userId} from database____`)
		const result = await repository.remove(userId)
		logger.info(`____End removing user from database____`)
		return result
	}

	const findBySubscriberId = async (subscriberId) => {
		logger.info(
			`____Start finding user with subscriber id: ${subscriberId} from database____`
		)
		const result = await repository.findBySubscriberId(subscriberId)
		logger.info(`____End finding user  by subscriber id from database____`)
		return result
	}

	return {
		create,
		findAll,
		findById,
		update,
		remove,
		findByEmail,
		findBySubscriberId,
		createAdmin,
	}
}
