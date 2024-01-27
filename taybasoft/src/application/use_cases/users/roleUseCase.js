import RoleEntity from "../../../entities/users/RoleEntity.js"
import newError from "../../../utils/newError.js"

export default function roleUseCase(roleRepository, logger) {
  const addNewRole = async (modelData) => {
    logger.info("____Start create new role use case____")
    logger.info("start extracting role model data")
    const { role, description } = modelData
    logger.info("end extracting role model data")
    logger.info("start creating role entity")
    const newRole = new RoleEntity(role, description)
    logger.info("end creating role entity")
    const createdRole = await roleRepository.create(newRole)
    logger.info(`Role created with id : ${createdRole.id}`)
    logger.info("____ End create new pack use case____")
    return createdRole
  }
  const findAllRoles = async () => {
    logger.info("____Start get all roles use case____")
    const result = await roleRepository.findAll()
    logger.info("____End get all roles use case____")
    return result
  }

  const findRole = async (roleId) => {
    logger.info("____Start get role by id use case____")
    const result = await roleRepository.findById(roleId)
    logger.info("____End get role by id use case____")
    return result
  }

  const findRoleByName = async (roleName) => {
    logger.info("____Start get role by name use case____")
    const result = await roleRepository.findByName(roleName)
    logger.info("____End get role by name use case____")
    return result
  }

  const updateRole = async (roleId, modelData) => {
    logger.info("____Start updating role use case____")
    const existsRole = await roleRepository.findById(roleId)
    if (!existsRole || existsRole === null) {
      throw newError(`No role found with id: ${roleId}`, 404)
    }
    const { role, description } = modelData
    const updatedRole = new RoleEntity(role, description)

    await roleRepository.update(roleId, updatedRole)
    const result = await roleRepository.findById(roleId)
    logger.info("____End updating role use case____")
    return result
  }

  const removeRole = async (roleId) => {
    logger.info("____Start removing role use case____")
    const existsRole = await roleRepository.findById(roleId)
    if (!existsRole || existsRole === null) {
      throw newError(`No role found with id: ${roleId}`, 404)
    }
    const result = await roleRepository.remove(roleId)
    logger.info("____End removing pack use case____")
    return result
  }

  return {
    addNewRole,
    findAllRoles,
    findRole,
    updateRole,
    removeRole,
    findRoleByName,
  }
}
