import PackEntity from "../../../entities/subscriptions/PackEntity.js"
import newError from "../../../utils/newError.js"

export default function packUseCase(packRepository, logger) {
  const addNewPack = async (modelData) => {
    logger.info("____Start create new pack use case____")
    logger.info("start extracting pack model data")
    const { designation, duration, price, promotion, nbrProjects, nbrClients } =
      modelData
    logger.info("end extracting pack model data")
    logger.info("start creating pack entity")
    const newPack = new PackEntity(
      designation,
      duration,
      price,
      promotion,
      nbrProjects,
      nbrClients
    )
    logger.info("end creating pack entity")
    const createdPack = await packRepository.create(newPack)
    logger.info(`Pack created with id : ${createdPack.id}`)
    logger.info("____ End create new pack use case____")
    return createdPack
  }
  const findAllPacks = async () => {
    logger.info("____Start get all packs use case____")
    const result = await packRepository.findAll()
    logger.info("____End get all packs use case____")
    return result
  }

  const findPack = async (packId) => {
    logger.info("____Start get pack by id use case____")
    const result = await packRepository.findById(packId)
    logger.info("____End get pack by id use case____")
    return result
  }

  const updatePack = async (packId, modelData) => {
    logger.info("____Start updating pack use case____")
    const foundPack = await packRepository.findById(packId)
    if (!foundPack || foundPack === null) {
      throw newError(`No pack found with id: ${packId}`, 404)
    }
    const { designation, duration, price, promotion, nbrProjects, nbrClients } =
      modelData
    const updatedPack = new PackEntity(
      designation,
      duration,
      price,
      promotion,
      nbrProjects,
      nbrClients
    )
    await packRepository.update(packId, updatedPack)
    const result = await packRepository.findById(packId)
    logger.info("____End updating pack use case____")
    return result
  }

  const removePack = async (packId) => {
    logger.info("____Start removing or deactivating pack use case____")
    let result
    const foundPack = await packRepository.findById(packId)

    if (!foundPack || foundPack === null) {
      throw newError(`No pack found with id: ${packId}`, 404)
    }

    const packUsed = await packRepository.findPackInSubscriptions(packId)
    if (packUsed == null) {
      logger.info("____Start removing  pack use case____")
      result = await packRepository.remove(packId)
      logger.info("____End removing  pack use case____")
    } else {
      logger.info("____Start deactivating  pack use case____")
      result = await packRepository.deactivate(foundPack)
      logger.info("____End deactivating  pack use case____")
    }
    logger.info("____End removing or deactivating pack use case____")
    return result
  }

  return { addNewPack, findAllPacks, findPack, updatePack, removePack }
}
