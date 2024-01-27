import SubscriberEntity from "../../../entities/subscriptions/SubscriberEntity.js"
import newError from "../../../utils/newError.js"
export default function subscriberUseCase(subscriberRepository, logger) {
	async function addNewSubscriber(modelData, transaction) {
		logger.info("____Start add new subscriber use case____")
		// Extract model data
		logger.info("start extracting pack model data")
		const { companyName, email, address, phoneNumber } = modelData
		//conditions
		if (!companyName && !email && !address && !phoneNumber) {
			logger.error("invalid subscriber model data")
			throw newError("Invalid subscriber model data", 400)
		}
		logger.info("end extracting subscriber model data")
		logger.info("start creating subscriber entity")
		const newSubscriber = new SubscriberEntity(
			companyName,
			email,
			address,
			phoneNumber
		)
		logger.info("end creating subscriber entity")
		const createdSubscriber = await subscriberRepository.create(
			newSubscriber,
			transaction
		)
		logger.info(`Subscriber created with id : ${createdSubscriber.id}`)
		logger.info("____ End add new subscriber use case____")
		return createdSubscriber
	}

	async function findAllSubscribers() {
		//conditions
		logger.info("Start get all subscribers use case")
		const subscribersList = await subscriberRepository.findAll()
		logger.info("End get all subscribers use case")
		return subscribersList
	}

	async function findSubscriber(id) {
		//conditions
		logger.info("Start get single subscriber use case")
		const subscriber = await subscriberRepository.findById(id)
		logger.info("End get single subscriber use case")
		return subscriber
	}

	async function removeSubscriber(id) {
		//conditions
		logger.info("Start removing single subscriber use case")

		const existsSubscriber = await subscriberRepository.findById(id)
		if (!existsSubscriber) {
			throw newError(`No subscriber found with id : ${id}`, 404)
		}
		return await subscriberRepository.remove(id)
	}

	async function updateSubscriber(id, updateSubscriberModel) {
		//conditions
		logger.info("Start updating single subscriber use case")
		const { companyName, email, phoneNumber, address, subscriptionStatus } =
			updateSubscriberModel
		const updatedSubscriber = new SubscriberEntity(
			companyName,
			email,
			phoneNumber,
			address,
			subscriptionStatus
		)

		const existsSubscriber = await subscriberRepository.findById(id)
		if (!existsSubscriber) {
			throw newError(`No subscriber found with id : ${id}`, 404)
		}
		await subscriberRepository.update(id, updatedSubscriber)
		const result = await subscriberRepository.findById(id)

		logger.info("End updating single subscriber use case")

		return result
	}

	return {
		addNewSubscriber,
		findAllSubscribers,
		findSubscriber,
		removeSubscriber,
		updateSubscriber,
	}
}
