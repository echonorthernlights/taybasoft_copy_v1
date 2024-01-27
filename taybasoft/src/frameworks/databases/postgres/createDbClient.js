import { Sequelize } from "sequelize"
import config from "../../../config/config.js"

let clientInstance

export default function createDbClient(clientName) {
  if (!clientInstance) {
    const { database, username, password, host, dialect } = config.dbConfig
    switch (clientName) {
      case "sequelize":
        // console.log("Creating new Sequelize instance.")
        // clientInstance = new Sequelize(database, username, password, {
        // 	host,
        // 	dialect,
        // 	define: {
        // 		language: "fr",
        // 	},
        // })
        console.log("Creating new SQLite instance.")
        clientInstance = new Sequelize({
          dialect: "sqlite",
          storage: "./taybasoft_test_db.db",
          define: {
            language: "fr",
          },
        })
        break
      default:
        break
    }
  }
  return { clientInstance, clientName }
}
