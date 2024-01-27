export default function authRepository(repository, logger) {
  const authenticate = async (authEntity) => {
    logger.info("____Start authentication user from database____");
    const result = await repository.authenticate(authEntity);
    logger.info(`____End authenticating user from database ____`);
    return result;
  };

  const findSessionByUserId = async (userId) => {
    logger.info("____Start find session by userId from database____");
    const result = await repository.findSessionByUserId(userId);
    logger.info(`____End find session by userId from database ____`);
    return result;
  };

  const addNewUserSession = async (userId, accessToken) => {
    logger.info("____Start add new user session from database____");
    const result = await repository.addNewUserSession(userId, accessToken);
    logger.info(`____End add new user session from database ____`);
    return result;
  };

  const updateUserSession = async (session, accessToken) => {
    logger.info("____Start update user session from database____");
    const result = await repository.updateUserSession(session, accessToken);
    logger.info(`____End update user session from database ____`);
    return result;
  };

  const logout = async () => {
    logger.info("____Start logout user session from database____");
    const result = await repository.logout();
    logger.info(`____End logout user session from database ____`);
    return result;
  };

  const removeUserSession = async (userId) => {
    logger.info("____Start removing user session from database____");
    const result = await repository.removeUserSession(userId);
    logger.info(`____End removing user session from database ____`);
    return result;
  };
  return {
    authenticate,
    findSessionByUserId,
    addNewUserSession,
    updateUserSession,
    logout,
    removeUserSession,
  };
}
