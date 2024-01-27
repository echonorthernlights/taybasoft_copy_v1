import SessionModel from "../../models/auth/SessionModel.js";

export default function authDbRepository() {
  // const authenticate = async (authEntity) => {
  //   console.log("authenticate in db repo");
  //   return;
  // };

  const findSessionByUserId = async (userId) => {
    return await SessionModel.findOne({ where: { user: userId } });
  };

  const addNewUserSession = async (userId, accessToken) => {
    return await SessionModel.create({
      user: userId,
      accessToken,
    });
  };

  const updateUserSession = async (session, accessToken) => {
    session.accessToken = accessToken;
    return await session.save();
  };

  const removeUserSession = async (userId) => {
    return await SessionModel.destroy({ where: { user: userId } });
  };

  return {
    // authenticate,
    findSessionByUserId,
    addNewUserSession,
    updateUserSession,
    removeUserSession,
  };
}
