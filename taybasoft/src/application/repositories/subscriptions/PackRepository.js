export default function packRepository(repository, logger) {
  const create = async (pack) => {
    logger.info("____Start saving new pack to database____")
    const result = await repository.create(pack)
    logger.info(`pack persisted in database with id : ${result.id}`)
    logger.info(`____End saving new pack to database____`)
    return result
  }

  const findAll = async () => {
    logger.info("____Start getting packs from database____")
    const result = await repository.findAll()
    logger.info(`____End getting packs from database____`)
    return result
  }

  const findById = async (packId) => {
    logger.info(`____Start finding pack with id: ${packId} from database____`)
    const result = await repository.findById(packId)
    logger.info(`____End finding pack from database____`)
    return result
  }

  const update = async (packId, updatedPack) => {
    logger.info(`____Start updating pack with id: ${packId} from database____`)
    const result = await repository.update(packId, updatedPack)
    logger.info(`____End updating pack from database____`)
    return result
  }

  const remove = async (packId) => {
    logger.info(`____Start removing pack with id: ${packId} from database____`)
    const result = await repository.remove(packId)
    logger.info(`____End removing pack from database____`)
    return result
  }

  const findPackInSubscriptions = async (packId) => {
    logger.info(
      `____Start finding pack with id: ${packId} in subscriptions from database____`
    )
    const result = await repository.findPackInSubscriptions(packId)
    logger.info(`____End finding pack in subscriptions from database____`)
    return result
  }
  const deactivate = async (pack) => {
    logger.info(
      `____Start deactivating pack with id: ${pack.id}  from database____`
    )
    const result = await repository.deactivate(pack)
    logger.info(`____End deactivating pack  from database____`)
    return result
  }

  return {
    create,
    findAll,
    findById,
    update,
    remove,
    findPackInSubscriptions,
    deactivate,
  }
}
