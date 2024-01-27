import RoleModel from "../../models/users/RoleModel.js"
export default function roleDbRepository() {
  const create = async (roleEntity) => {
    const newRole = new RoleModel({
      role: roleEntity.role,
      description: roleEntity.description,
    })

    return await newRole.save()
  }

  const findAll = async () => {
    return await RoleModel.findAll()
  }

  const findById = async (roleId) => {
    return await RoleModel.findByPk(roleId)
  }

  const findByName = async (roleName) => {
    return await RoleModel.findOne({ where: { role: roleName } })
  }

  const update = async (roleId, roleEntity) => {
    const updateRole = {
      role: roleEntity.role,
      description: roleEntity.description,
    }
    return await RoleModel.update(updateRole, { where: { id: roleId } })
  }

  const remove = async (roleId) => {
    return await RoleModel.destroy({ where: { id: roleId } })
  }
  return { create, findAll, findById, update, remove, findByName }
}
