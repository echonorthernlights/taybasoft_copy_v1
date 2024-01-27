import RoleModel from "../../models/users/RoleModel.js"
import UserModel from "../../models/users/UserModel.js"
export default function userDbRepository() {
  const createAdmin = async (userEntity, t) => {
    const newUser = await UserModel.create(
      {
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        email: userEntity.email,
        password: userEntity.password,
        role: userEntity.role,
        subscriber: userEntity.subscriber,
        status: userEntity.status,
      },
      { transaction: t }
    )

    return newUser
  }
  const create = async (userEntity) => {
    const newUser = new UserModel({
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      password: userEntity.password,
      role: userEntity.role,
      subscriber: userEntity.subscriber,
      status: userEntity.status,
    })

    return await newUser.save()
  }

  const findAll = async () => {
    return await UserModel.findAll()
  }

  const findById = async (userId) => {
    return await UserModel.findByPk(userId)
  }

  const findByEmail = async (email) => {
    return await UserModel.findOne({
      where: { email },
      include: [
        {
          model: RoleModel,
          attributes: ["id"],
        },
      ],
    })
  }

  const findBySubscriberId = async (subscriberId) => {
    return await UserModel.findOne({ where: { subscriber: subscriberId } })
  }
  const update = async (userId, userEntity) => {
    const updateUser = {
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      password: userEntity.password,
      role: userEntity.role,
      subscriber: userEntity.subscriber,
      status: userEntity.status,
    }

    const userInstance = await UserModel.findByPk(userId)
    userInstance.set(updateUser)
    return await userInstance.save()

    //   return await UserModel.update(updateUser, {
    //     where: { id: userId },
    //     hooks: true,
    //   });
  }

  const remove = async (userId) => {
    return await UserModel.destroy({ where: { id: userId } })
  }
  return {
    create,
    findAll,
    findById,
    update,
    remove,
    findByEmail,
    findBySubscriberId,
    createAdmin,
  }
}
