export default function subscriptionRepository(repository, logger) {
  const create = async (subscription) => {
    logger.info("____Start saving subscription to database____")
    const result = await repository.create(subscription)
    logger.info(`____End saving subscription to database____`)
    return result
  }

  const findAll = async () => {
    logger.info("____Start getting subscriptions from database____")
    const result = await repository.findAll()
    logger.info(`____End getting subscriptions from database____`)
    return result
  }

  const findAllBySubscriberId = async (subscriberId) => {
    logger.info(
      `____Start getting subscriptions by subscriber id: ${subscriberId} from database____`
    )
    const result = await repository.findAllBySubscriberId(subscriberId)
    logger.info(`____End getting subscriptions from database____`)
    return result
  }

  const findById = async (id) => {
    logger.info("____Start getting single subscription from database____")
    const result = await repository.findById(id)
    logger.info(`____End getting single subscription from database____`)
    return result
  }

  const update = async (id, subscription) => {
    logger.info("____Start updating single subscription from database____")
    const result = await repository.update(id, subscription)
    logger.info(`____End updating single subscription from database____`)
    return result
  }

  const remove = async (id) => {
    logger.info("____Start deleting single subscription from database____")
    const result = await repository.remove(id)
    logger.info(`____End deleting single subscription from database____`)
    return result
  }

  return { create, findAll, findById, update, remove, findAllBySubscriberId }
}
