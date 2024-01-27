import { default as tokenServices } from "../../../services/tokenServices.js";
import newError from "../../../utils/newError.js";

export default function authUseCase(authRepository, logger) {
  const authenticateUser = async (user) => {
    logger.info("____Start authenticate user use case____");
    const accessToken = tokenServices.generateAccessToken(user.id);
    const refreshToken = tokenServices.generateRefreshToken(user.id);

    logger.info("____ End authenticate user use case____");
    return {
      accessToken,
      refreshToken,
    };
  };

  const logoutUser = async () => {
    logger.info("____Start logout user use case____");
    const logoutResult = tokenServices.removeAccessToken();

    logger.info("____ End logout user use case____");
    return {
      logoutResult,
    };
  };

  const checkUserSession = async (user) => {
    logger.info("____Start check user session use case____");
    const foundSession = await authRepository.findSessionByUserId(user.id);
    if (foundSession && foundSession !== null) {
      const decodedAccessToken = tokenServices.decodeToken(
        foundSession.accessToken
      );
      const isExpired = tokenServices.isTokenExpired(decodedAccessToken)
      if (!isExpired) {
        throw newError("User already logged in!", 409);
      }
    }
    logger.info("____ End check user session use case____");
    return foundSession;
  };

  const addNewUserSession = async (userId, accessToken) => {
    logger.info("____Start add new user session use case____");
    await authRepository.addNewUserSession(userId, accessToken);
    logger.info("____ End add new user session use case____");
    return;
  };

  const updateUserSession = async (session, accessToken) => {
    logger.info("____Start update user session use case____");
    await authRepository.updateUserSession(session, accessToken);
    logger.info("____ End update user session use case____");
    return;
  };

  const removeUserSession = async (userId, res) => {
    logger.info("____Start remove user session use case____");
    await authRepository.removeUserSession(userId);
    tokenServices.removeAccessToken(res);
    tokenServices.removeRefreshToken(res);
    logger.info("____ End remove user session use case____");
    return;
  };

  return {
    authenticateUser,
    checkUserSession,
    addNewUserSession,
    updateUserSession,
    logoutUser,
    removeUserSession,
  };
}
