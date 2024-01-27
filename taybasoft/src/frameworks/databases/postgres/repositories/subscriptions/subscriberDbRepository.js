import newError from "../../../../../utils/newError.js"
import SubscriberModel from "../../models/subscriptions/SubscriberModel.js"
import UserModel from "../../models/users/UserModel.js"

export default function subscriberDbRepository() {
  const create = async (subscriber, t) => {
    const newSubscriber = await SubscriberModel.create(
      {
        companyName: subscriber.companyName,
        email: subscriber.email,
        address: subscriber.address,
        phoneNumber: subscriber.phoneNumber,
      },
      { transaction: t }
    )

    return newSubscriber
  }

  const findAll = async () => {
    return await SubscriberModel.findAll()
  }

  const findById = async (id) => {
    return await SubscriberModel.findByPk(id)
  }
  const update = async (id, subscriberEntity) => {
    const updatedSubscriber = {
      companyName: subscriberEntity.companyName,
      email: subscriberEntity.email,
      address: subscriberEntity.address,
      phoneNumber: subscriberEntity.phoneNumber,
      subscriptionStatus: subscriberEntity.subscriptionStatus,
    }
    if (
      (await SubscriberModel.update(updatedSubscriber, {
        where: { id },
      })) > 0
    ) {
      return await findById(id)
    }

    throw newError(`No subscriber found with the id : ${id}`, 404)
  }

  const remove = async (id) => {
    let result
    try {
      await UserModel.destroy({ where: { subscriber: id } })
      result = await SubscriberModel.destroy({ where: { id } })
    } catch (error) {
      throw newError(error.message, 500)
    }
    return result
  }

  return { create, findAll, findById, remove, update }
}
