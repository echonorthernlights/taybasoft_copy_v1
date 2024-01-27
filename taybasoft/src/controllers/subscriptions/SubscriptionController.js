import SubscriptionUseCase from "../../application/use_cases/subscriptions/subscriptionUseCase.js"
import catchAsync from "../../utils/catchAsync.js"
import newError from "../../utils/newError.js"
import valideUuid from "../../utils/valideUuid.js"

export default function subscriptionController(
	subscriptionRepository,
	subscriptionDbRepository,
	logger
) {
	const repository = subscriptionRepository(subscriptionDbRepository(), logger)
	const subscriptionUseCase = SubscriptionUseCase(repository, logger)

	const addNewSubscription = catchAsync(async (req, res, next) => {
		logger.info("____Start adding new subscription controller____")
		const modelData = { ...req.body }
		const result = await subscriptionUseCase.addNewSubscription(modelData)
		logger.info("____End adding new subscription controller____")
		return res.json({
			msg: "Subscription added successfully",
			subscription: result,
		})
	})

	const findAllSubscriptions = catchAsync(async (req, res, next) => {
		logger.info("____Start getting all subscriptions controller____")
		const result = await subscriptionUseCase.findAllSubscriptions()
		logger.info("____End getting all subscriptions controller____")
		return res.json(result)
	})

	const findAllBySubscriberId = catchAsync(async (req, res, next) => {
		logger.info(
			"____Start getting all subscriptions by subscriber id controller____"
		)
		const { id } = req.params
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid subscription id: ${id}`, 400)
		}
		const result = await subscriptionUseCase.findAllBySubscriberId(id)
		logger.info(
			"____End getting all subscriptions by subscriber id controller____"
		)
		return res.json(result)
	})

	const findSubscription = catchAsync(async (req, res, next) => {
		logger.info(" ____Start getting single subscription controller____")
		const { id } = req.params
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid subscription id: ${id}`, 400)
		}

		const result = await subscriptionUseCase.findSubscription(id)
		logger.info(" ____End getting single subscription controller____")
		if (result == null) throw newError(`Subscription with id : ${id} not found`)
		return res.json(result)
	})

	const removeSubscription = catchAsync(async (req, res, next) => {
		logger.info(" ____Start remove subscription controller____")
		const { id } = req.params
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid subscription id: ${id}`, 400)
		}

		const result = await subscriptionUseCase.removeSubscription(id)
		logger.info(" ____End remove subscription controller____")
		return res.json({ subscription: result })
	})
	const updateSubscription = catchAsync(async (req, res, next) => {
		logger.info(" ____Start update subscription controller____")
		const { id } = req.params
		const modelData = req.body
		if (!valideUuid(id.toString())) {
			throw newError(`Invalid subscription id: ${id}`, 400)
		}

		const result = await subscriptionUseCase.updateSubscription(id, modelData)
		logger.info(" ____End update subscription controller____")
		return res.json({
			msg: "subscription updated successfully.",
			subscription: result,
		})
	})

	return {
		addNewSubscription,
		findAllSubscriptions,
		findSubscription,
		removeSubscription,
		updateSubscription,
		findAllBySubscriberId,
	}
}
