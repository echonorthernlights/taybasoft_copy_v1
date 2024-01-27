export default function roleRepository(repository, logger) {
  const create = async (role) => {
    logger.info("____Start saving new role to database____")
    const result = await repository.create(role)
    logger.info(`role persisted in database with id : ${result.id}`)
    logger.info(`____End saving new role to database____`)
    return result
  }

  const findAll = async () => {
    logger.info("____Start getting roles from database____")
    const result = await repository.findAll()
    logger.info(`____End getting roles from database____`)
    return result
  }

  const findById = async (roleId) => {
    logger.info(`____Start finding role with id: ${roleId} from database____`)
    const result = await repository.findById(roleId)
    logger.info(`____End finding role from database____`)
    return result
  }

  const findByName = async (roleName) => {
    logger.info(
      `____Start finding role with name : ${roleName} from database____`
    )
    const result = await repository.findByName(roleName)
    logger.info(`____End finding role from database____`)
    return result
  }

  const update = async (roleId, updatedRole) => {
    logger.info(`____Start updating role with id: ${roleId} from database____`)
    const result = await repository.update(roleId, updatedRole)
    logger.info(`____End updating role from database____`)
    return result
  }

  const remove = async (roleId) => {
    logger.info(`____Start removing role with id: ${roleId} from database____`)
    const result = await repository.remove(roleId)
    logger.info(`____End removing pack from database____`)
    return result
  }

  return { create, findAll, findById, update, remove, findByName }
}
