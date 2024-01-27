export default function subscriberRepository(repository, logger) {
	const create = async (subscriber, transaction) => {
		logger.info("Start saving subscriber to database")
		const result = await repository.create(subscriber, transaction)
		logger.info(`Subscriber persisted in database with id : ${result.id}`)
		logger.info(`End saving subscriber to database`)
		return result
	}

	const findAll = async () => {
		logger.info("Start getting subscribers from database")
		const result = await repository.findAll()
		logger.info(`End getting subscribers from database`)
		return result
	}

	const findById = async (id) => {
		logger.info("Start getting single subscriber from database")
		const result = await repository.findById(id)
		logger.info(`End getting single subscriber from database`)
		return result
	}

	const update = async (id, subscriber) => {
		logger.info("Start updating single subscriber from database")
		// call to db repo function
		const result = await repository.update(id, subscriber)
		logger.info(`End updating single subscriber from database`)
		return result
	}

	const remove = async (id) => {
		logger.info("Start deleting single subscriber from database")
		const result = await repository.remove(id)
		logger.info(`End deleting single subscriber from database`)
		return result
	}

	return { create, findAll, findById, update, remove }
}
