import express from "express"
import path from "path"
import http from "http"
import config from "./src/config/config.js"
import createDbClient from "./src/frameworks/databases/postgres/createDbClient.js"
import expressConfig from "./src/frameworks/webserver/express.js"
import {
  errorMiddleware,
  notFoundError,
} from "./src/frameworks/webserver/middlewares/errorHandlingMiddleware.js"
import routes from "./src/frameworks/webserver/routes/index.js"
import serverConfig from "./src/frameworks/webserver/server.js"
import logger from "./src/infrastructure/loggers/logger.js"
import subscriptionsActivationTask from "./src/infrastructure/tasks/cronTasks.js"
const { dbClient, clientName } = createDbClient("sequelize")
const app = express()
expressConfig(app)
routes(app, express)

// unhandledRejection + uncaughtException logs handling
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise}, reason : ${reason}`)
})
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception  : ${error} `)
})

//Production config
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, "/client/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  )
} else {
  //const __dirname = path.resolve();
  //app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
}

app.use(notFoundError)
app.use(errorMiddleware)
const server = http.createServer(app)
subscriptionsActivationTask.start()
serverConfig(app, dbClient, clientName, server, config).startServer()
