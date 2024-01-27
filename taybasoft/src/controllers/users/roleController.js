import RoleUseCase from "../../application/use_cases/users/roleUseCase.js";
import catchAsync from "../../utils/catchAsync.js";
import newError from "../../utils/newError.js";
import valideUuid from "../../utils/valideUuid.js";
export default function roleController(
  roleRepository,
  roleDbRepository,
  logger
) {
  const repository = roleRepository(roleDbRepository(), logger);
  const roleUseCase = RoleUseCase(repository, logger);

  const addNewRole = catchAsync(async (req, res, next) => {
    logger.info("____Start add new role controller____");
    const modelData = { ...req.body };
    const result = await roleUseCase.addNewRole(modelData);
    logger.info("____End add new role controller____");
    return res.json({
      msg: "Role added successfully",
      data: result,
    });
  });

  const findAllRoles = catchAsync(async (req, res, next) => {
    logger.info("____Start find all roles controller____");
    const result = await roleUseCase.findAllRoles();
    logger.info("____End find all roles controller____");
    return res.json(result);
  });

  const findRole = catchAsync(async (req, res, next) => {
    logger.info("____Start find role controller____");
    const { id } = req.params;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid role with id: ${id}`, 400);
    }
    const result = await roleUseCase.findRole(id);
    if (result === null) {
      throw newError(`No role found with id: ${id}`, 404);
    }
    logger.info("____End find role controller____");
    return res.json(result);
  });

  const updateRole = catchAsync(async (req, res, next) => {
    logger.info("____Start update role controller____");
    const { id } = req.params;
    const modelData = req.body;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid role id: ${id}`, 400);
    }
    const result = await roleUseCase.updateRole(id, modelData);
    logger.info("____End update role controller____");
    return res.json({ status: "Role updated successfully", data: result });
  });

  const removeRole = catchAsync(async (req, res, next) => {
    logger.info("____Start remove role controller____");
    const { id } = req.params;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid role id: ${id}`, 400);
    }
    await roleUseCase.removeRole(id);
    logger.info("____End remove role controller____");
    return res.json({ msg: "Role removed successfully" });
  });

  return {
    addNewRole,
    findAllRoles,
    findRole,
    updateRole,
    removeRole,
  };
}
