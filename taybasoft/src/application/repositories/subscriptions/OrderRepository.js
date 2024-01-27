export default function orderRepository(repository, logger) {
	const create = async (order) => {
		logger.info('____Start saving new order to database____')
		const result = await repository.create(order)
		logger.info(`order persisted in database with id : ${result.id}`)
		logger.info(`____End saving new order to database____`)
		return result
	}

	const findAll = async () => {
		logger.info('____Start getting orders from database____')
		const result = await repository.findAll()
		logger.info(`____End getting orders from database____`)
		return result
	}

	const findById = async (orderId) => {
		logger.info(`____Start finding order with id: ${orderId} from database____`)
		const result = await repository.findById(orderId)
		logger.info(`____End finding order from database____`)
		return result
	}

	const update = async (orderId, updatedOrder) => {
		logger.info(`____Start updating order with id: ${orderId} from database____`)
		const result = await repository.update(orderId, updatedOrder)
		logger.info(`____End updating order from database____`)
		return result
	}

	const remove = async (orderId) => {
		logger.info(`____Start removing order with id: ${orderId} from database____`)
		const result = await repository.remove(orderId)
		logger.info(`____End removing order from database____`)
		return result
	}

	return { create,  findAll, findById, update, remove}
}
