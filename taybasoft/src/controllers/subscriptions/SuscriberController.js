import SubscriberUseCase from "../../application/use_cases/subscriptions/subscriberUseCase.js"
import RoleUseCase from "../../application/use_cases/users/roleUseCase.js"
import UserUseCase from "../../application/use_cases/users/userUseCase.js"
import createDbClient from "../../frameworks/databases/postgres/createDbClient.js"
import catchAsync from "../../utils/catchAsync.js"
import newError from "../../utils/newError.js"
import valideUuid from "../../utils/valideUuid.js"

export default function subscriberController(
  subscriberRepository,
  subscriberDbRepository,
  userRepository,
  userDbRepository,
  roleRepository,
  roleDbRepository,
  logger
) {
  const repository = subscriberRepository(subscriberDbRepository(), logger)
  const userRepositoryIMP = userRepository(userDbRepository(), logger)
  const roleRepositoryIMP = roleRepository(roleDbRepository(), logger)

  const subscriberUseCase = SubscriberUseCase(repository, logger)
  const userUseCase = UserUseCase(userRepositoryIMP, logger)
  const roleUseCase = RoleUseCase(roleRepositoryIMP, logger)

  const { clientInstance } = createDbClient("sequelize")

  const addNewSubscriber = catchAsync(async (req, res, next) => {
    logger.info("____Start add new subscriber controller____")
    const adminRole = await roleUseCase.findRoleByName("admin")
    if (!adminRole) {
      throw newError("Cannot find admin role!", 404)
    }
    let transaction
    try {
      transaction = await clientInstance.transaction()

      const subscriberModelData = {
        companyName: req.body.companyName,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        subscriptionStatus: req.body.subscriptionStatus,
      }

      const subscriberResult = await subscriberUseCase.addNewSubscriber(
        subscriberModelData,
        transaction
      )

      logger.info("Start extracting user model data")
      const userModelData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.adminEmail,
        password: req.body.password,
        role: adminRole.id,
        subscriber: subscriberResult.id,
      }
      logger.info("End extracting user model data")

      const userResult = await userUseCase.addNewUserAdmin(
        userModelData,
        transaction
      )
      await transaction.commit()
      logger.info("____End add new subscriber controller____")
      return res.json({
        msg: "Abonné et compte utilisateur ajoutés avec succès.",
        subscriber: subscriberResult,
        user: userResult,
      })
    } catch (error) {
      if (transaction) await transaction.rollback()
      logger.error("add new subscriber and admin user transaction failed!")
      logger.error(error.message)
      logger.info("____End add new subscriber controller____")
      throw newError(error.message, 500)
    }
  })

  const findAllSubscribers = catchAsync(async (req, res, next) => {
    logger.info("____Start getting all subscribers controller____")
    const result = await subscriberUseCase.findAllSubscribers()
    logger.info("____End getting all subscribers controller____")
    return res.json(result)
  })

  const findSubscriber = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid subscriber id: ${id}`, 400)
    }
    logger.info(" ____Start getting single subscriber controller____")
    const result = await subscriberUseCase.findSubscriber(id)
    logger.info(" ____End getting single subscriber controller____")
    if (result == null) throw newError(`Subscriber with id : ${id} not found`)
    return res.json(result)
  })
  const removeSubscriber = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid subscriber id: ${id}`, 400)
    }
    logger.info(" ____Start removing subscriber controller____")
    const result = await subscriberUseCase.removeSubscriber(id)
    logger.info(" ____End removing single subscriber controller____")
    if (result == 1) {
      return res.json({ msg: "Subscriber removed successfully" })
    } else {
      throw newError(`Subscriber with id: ${id} not removed`, 500)
    }
  })
  const updateSubscriber = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const modelData = req.body
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid subscriber id: ${id}`, 400)
    }

    logger.info(" ____Start updating subscriber controller____")
    const result = await subscriberUseCase.updateSubscriber(id, modelData)
    logger.info(" ____End updating subscriber controller____")
    if (result) {
      return res.json({ msg: "Subscriber updated successfully", result })
    } else {
      throw newError(`Subscriber with id: ${id} not removed`, 500)
    }
  })

  return {
    addNewSubscriber,
    findAllSubscribers,
    findSubscriber,
    removeSubscriber,
    updateSubscriber,
  }
}
