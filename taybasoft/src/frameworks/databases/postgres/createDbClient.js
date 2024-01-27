import { Sequelize } from "sequelize"
import config from "../../../config/config.js"

let clientInstance

export default function createDbClient(clientName) {
	if (!clientInstance) {
		const { database, username, password, host, dialect } = config.dbConfig
		switch (clientName) {
			case "sequelize":
				console.log("Creating new Sequelize instance.")
				clientInstance = new Sequelize(database, username, password, {
					host,
					dialect,
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
