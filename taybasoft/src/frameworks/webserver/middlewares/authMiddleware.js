import tokenServices from "../../../services/tokenServices.js"
import catchAsync from "../../../utils/catchAsync.js"
import newError from "../../../utils/newError.js"
import SessionModel from "../../databases/postgres/models/auth/SessionModel.js"
import UserModel from "../../databases/postgres/models/users/UserModel.js"

const protect = catchAsync(async (req, res, next) => {
  //Read tokens from cookies
  const accessToken = req.cookies.jwtaccesstoken
  const refreshToken = req.cookies.jwtrefreshtoken
  if (accessToken) {
    //decode access token from cookies and verify expiration
    const decodedAccessToken = tokenServices.decodeToken(accessToken)
    const isAccessTokenExpired =
      tokenServices.isTokenExpired(decodedAccessToken)

    if (isAccessTokenExpired) {
      if (!refreshToken) {
        throw newError("Not authorized, token expired!", 401)
      } else {
        //decode refresh token from cookies and verify expiration
        const decodedRefreshToken = tokenServices.decodeToken(refreshToken)
        const isRefreshTokenExpired =
          tokenServices.isTokenExpired(decodedRefreshToken)
        if (isRefreshTokenExpired) {
          throw newError("Not authorized, token expired!", 401)
        } else {
          // check if the userId is in sessions db and if the session.accessToken is valid
          const foundSession = await SessionModel.findOne({
            where: { user: decodedRefreshToken.userId },
          })
          if (foundSession !== null) {
            const foundSessionsDecodedToken = tokenServices.decodeToken(
              foundSession.accessToken
            )
            const isSessionTokenExpired = tokenServices.isTokenExpired(
              foundSessionsDecodedToken
            )
            if (!isSessionTokenExpired) {
              throw newError("User already logged in!", 409)
            }
            // generate new access token
            const newAccessToken = tokenServices.generateAccessToken(
              decodedRefreshToken.userId
            )
            // update the session accessToken
            foundSession.accessToken = newAccessToken
            await foundSession.save()
            tokenServices.setAccessTokenCookie(res, newAccessToken)
          } else {
            // generate new access token
            const newAccessToken = tokenServices.generateAccessToken(
              decodedRefreshToken.userId
            )
            // Create new session
            await SessionModel.create({
              user: decodedRefreshToken.userId,
              accessToken: newAccessToken,
            })
          }
        }
      }
    }
    try {
      req.user = await UserModel.findByPk(decodedAccessToken.userId)
      next()
    } catch (error) {
      throw newError("Not authorized, invalid token!!", 401)
    }
  } else {
    throw newError("Not authorized, no token!", 401)
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized !")
  }
}

export { admin, protect }
