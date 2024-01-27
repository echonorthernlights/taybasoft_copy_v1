import { DataTypes } from 'sequelize'

import createDbClient from '../../createDbClient.js'

const { clientInstance: sequelize } = createDbClient('sequelize')

const RevokedToken = sequelize.define('RevokedToken', {
	refreshToken: {
		type: DataTypes.STRING,
		allowNull: false,
	}
})

await RevokedToken.sync({ alter: true })

module.exports = RevokedToken
