import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import logger from "../infrastructure/loggers/logger.js"

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES
const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES
const environment = process.env.NODE_ENV

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: accessTokenExpires,
  })

  return token
}

const generateRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: refreshTokenExpires,
  })

  return token
}

const setAccessTokenCookie = (res, accessToken) => {
  logger.info("-----Start setting new access token--------")
  res.cookie("jwtaccesstoken", accessToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 3600 * 1000,
  })
  logger.info("-----End setting new access token--------")
}

const setRefreshTokenCookie = (res, refreshToken) => {
  logger.info("-----Start setting new refresh token--------")
  res.cookie("jwtrefreshtoken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 3600 * 1000,
  })
  logger.info("-----End setting new refresh token--------")
}

const decodeToken = (accessToken) => {
  const result = jwt.decode(accessToken)
  return result
}

const removeAccessToken = (res) => {
  logger.info("-----Start removing access token--------")
  res.cookie("jwtaccesstoken", "", {
    httpOnly: true,
    secure: environment !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 3600 * 1000,
  })
  logger.info("-----End removing access token--------")
}

const removeRefreshToken = (res) => {
  logger.info("-----Start removing refresh token--------")
  res.cookie("jwtrefreshtoken", "", {
    httpOnly: true,
    secure: environment !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 3600 * 1000,
  })
  logger.info("-----End removing refresh token--------")
}

const isTokenExpired = (decodedToken) => {
  const tokenExpirationDate = new Date(decodedToken.exp * 1000)
  const currentDate = new Date()
  return tokenExpirationDate <= currentDate ? true : false
}

const tokenServices = {
  generateAccessToken,
  setAccessTokenCookie,
  generateRefreshToken,
  setRefreshTokenCookie,
  decodeToken,
  removeAccessToken,
  removeRefreshToken,
  isTokenExpired,
}
export default tokenServices
