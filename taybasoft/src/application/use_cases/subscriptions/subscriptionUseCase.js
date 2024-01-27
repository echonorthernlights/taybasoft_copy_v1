import SubscriptionEntity from "../../../entities/subscriptions/SubscriptionEntity.js"
import newError from "../../../utils/newError.js"
export default function subscriptionUseCase(subscriptionRepository, logger) {
	async function addNewSubscription(modelData) {
		logger.info("____Start add new subscriber use case____")
		logger.info("start extracting pack model data")
		const {
			subscriber,
			packId,
			paymentDate,
			paymentMethod,
			totalAmount,
			startDate,
			endDate,
		} = modelData
		logger.info("end extracting subscription model data")

		logger.info("start checking if there is already an active subscription")
		let subscriptionStatus = "pending"
		const foundSubscriptions = await findAllBySubscriberId(subscriber)
		if (foundSubscriptions) {
			const activeSubscription = foundSubscriptions.find((sub) => {
				return sub.status == "active"
			})
			if (!activeSubscription) {
				const date = new Date()
				const targetDate = new Date(startDate)
				if (targetDate <= date) {
					subscriptionStatus = "active"
				}
			}
		}
		logger.info("end checking if there is already an active subscription")

		logger.info("start creating subscription entity")
		const newSubscription = new SubscriptionEntity(
			subscriber,
			packId,
			startDate,
			endDate,
			paymentDate,
			paymentMethod,
			totalAmount,
			subscriptionStatus
		)
		logger.info("end creating subscription entity")
		const createdSubscription = await subscriptionRepository.create(
			newSubscription
		)
		logger.info(`Subscription created with id : ${createdSubscription.id}`)
		logger.info("____ End add new subscriber use case____")
		return createdSubscription
	}

	async function findAllSubscriptions() {
		logger.info("____Start get all subscriptions use case____")
		const subscriptionsList = await subscriptionRepository.findAll()
		logger.info("____End get all subscription use case____")
		return subscriptionsList
	}

	async function findAllBySubscriberId(subscriberId) {
		logger.info(
			"____Start find all subscriptions by subscriber id use case____"
		)
		let result = []
		const subscriptionsList =
			await subscriptionRepository.findAllBySubscriberId(subscriberId)
		if (subscriptionsList && subscriptionsList.length > 0) {
			try {
				logger.info("Start formating subscriptions list")
				result = subscriptionsList.map((sub) => {
					return {
						id: sub.id,
						packDesignation: sub.Pack.designation,
						startDate: sub.startDate,
						endDate: sub.endDate,
						nbrProjects: `${sub.projectsList.length} / ${sub.Pack.nbrProjects}`,
						nbrClients: `${sub.nbrClients} / ${sub.Pack.nbrClients}`,
						paymentMethod: sub.paymentMethod,
						paymentDate: sub.paymentDate,
						totalAmount: sub.totalAmount,
						status: sub.status,
					}
				})
			} catch (error) {
				throw newError(error.message, 500)
			}
		}

		logger.info("End formating subscriptions list")
		logger.info("____End find all subscriptions by subscriber id use case____")
		return result
	}

	async function findSubscription(id) {
		logger.info("____Start get single subscription use case____")
		const subscription = await subscriptionRepository.findById(id)
		logger.info("____End get single subscription use case____")
		return subscription
	}

	async function removeSubscription(id) {
		logger.info("____Start removing single subscription use case____")
		const existsSubscription = await subscriptionRepository.findById(id)
		if (!existsSubscription) {
			throw newError(`No subscription found with id : ${id}`, 404)
		}
		const result = await subscriptionRepository.remove(id)
		logger.info("____End removing single subscription use case____")
		return result
	}

	async function updateSubscription(id, updateSubscriptionModel) {
		logger.info("____Start updating single subscription use case____")
		const {
			subscriber,
			packId,
			paymentDate,
			paymentMethod,
			totalAmount,
			startDate,
			endDate,
			status,
		} = updateSubscriptionModel

		const updatedSubscription = new SubscriptionEntity(
			subscriber,
			packId,
			startDate,
			endDate,
			paymentDate,
			paymentMethod,
			totalAmount,
			status
		)
		const existsSubscription = await subscriptionRepository.findById(id)
		if (!existsSubscription || existsSubscription === null) {
			throw newError(`No subscription found with id : ${id}`, 404)
		}
		const result = await subscriptionRepository.update(id, updatedSubscription)
		logger.info("____End updating single subscription use case____")
		return result
	}

	return {
		addNewSubscription,
		findAllSubscriptions,
		findSubscription,
		removeSubscription,
		updateSubscription,
		findAllBySubscriberId,
	}
}
