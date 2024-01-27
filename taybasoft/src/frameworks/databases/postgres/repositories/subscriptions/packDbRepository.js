import PackModel from "../../models/subscriptions/PackModel.js"
import SubscriptionModel from "../../models/subscriptions/SubscriptionModel.js"
export default function packDbRepository() {
  const create = async (packEntity) => {
    const newPack = new PackModel({
      designation: packEntity.designation,
      duration: packEntity.duration,
      price: packEntity.price,
      promotion: packEntity.promotion,
      nbrProjects: packEntity.nbrProjects,
      nbrClients: packEntity.nbrClients,
    })

    return await newPack.save()
  }

  const findAll = async () => {
    return await PackModel.findAll({ where: { isActive: true } })
  }

  const findById = async (packId) => {
    return await PackModel.findByPk(packId)
  }

  const update = async (packId, packEntity) => {
    const updatedPack = {
      designation: packEntity.designation,
      duration: packEntity.duration,
      price: packEntity.price,
      promotion: packEntity.promotion,
      nbrProjects: packEntity.nbrProjects,
      nbrClients: packEntity.nbrClients,
    }
    return await PackModel.update(updatedPack, { where: { id: packId } })
  }

  const remove = async (packId) => {
    return await PackModel.destroy({ where: { id: packId } })
  }

  const findPackInSubscriptions = async (packId) => {
    return await SubscriptionModel.findOne({ where: { packId } })
  }

  const deactivate = async (pack) => {
    //const packToDeactivate = await PackModel.findOne({ where: { id: packId } })

    pack.isActive = false

    await pack.save()
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
