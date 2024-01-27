import PackUseCase from "../../application/use_cases/subscriptions/packUseCase.js"
import catchAsync from "../../utils/catchAsync.js"
import newError from "../../utils/newError.js"
import valideUuid from "../../utils/valideUuid.js"
export default function packController(
  packRepository,
  packDbRepository,
  logger
) {
  const repository = packRepository(packDbRepository(), logger)
  const packUseCase = PackUseCase(repository, logger)

  const addNewPack = catchAsync(async (req, res, next) => {
    logger.info("____Start add new pack controller____")
    const modelData = { ...req.body }
    const result = await packUseCase.addNewPack(modelData)
    logger.info("____End add new pack controller____")
    return res.json({
      msg: "Pack added successfully",
      data: result,
    })
  })

  const findAllPacks = catchAsync(async (req, res, next) => {
    logger.info("____Start find all packs controller____")
    const result = await packUseCase.findAllPacks()
    logger.info("____End find all packs controller____")
    return res.json(result)
  })

  const findPack = catchAsync(async (req, res, next) => {
    logger.info("____Start find pack controller____")
    const { id } = req.params
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid pack with id: ${id}`, 400)
    }
    const result = await packUseCase.findPack(id)
    if (result === null) {
      throw newError(`No pack found with id: ${id}`, 404)
    }
    logger.info("____End find pack controller____")
    return res.json(result)
  })

  const updatePack = catchAsync(async (req, res, next) => {
    logger.info("____Start update pack controller____")
    const { id } = req.params
    const modelData = req.body
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid pack id: ${id}`, 400)
    }
    const result = await packUseCase.updatePack(id, modelData)
    logger.info("____End update pack controller____")
    return res.json({ status: "Pack updated successfully", data: result })
  })

  const removePack = catchAsync(async (req, res, next) => {
    logger.info("____Start remove pack controller____")
    const { id } = req.params
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid pack id: ${id}`, 400)
    }
    await packUseCase.removePack(id)
    logger.info("____End remove pack controller____")
    return res.json({ msg: "Pack removed successfully" })
  })

  return {
    addNewPack,
    findAllPacks,
    findPack,
    updatePack,
    removePack,
  }
}
