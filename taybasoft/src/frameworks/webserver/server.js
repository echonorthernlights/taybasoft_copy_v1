import { createTerminus } from '@godaddy/terminus'

const sequelizeHealthCheck = (sequelize) => {
	function healthCheck() {
		// ERR_CONNECTING_TO_DATABASE
		if (!sequelize.authenticate()) {
			return Promise.reject(new Error('Sequelize has disconnected'))
		}
		// CONNECTING_TO_DATABASE
		if (sequelize.connectionManager.pool.connecting) {
			return Promise.reject(new Error('Sequelize is connecting'))
		}
		// CONNECTED_TO_DATABASE
		return Promise.resolve()
	}

	// DATABASE_SYNCRONIZATION (recreate tables)
	async function syncDb() {
		try {
			await sequelize.sync({ force: true })
		} catch (error) {
			console.error('Error synchronizing database:', error)
		}
	}

	async function onSignal() {
		console.log('Server is starting cleanup')
		try {
			await sequelize.close()
			console.info('Sequelize has disconnected')
		} catch (error) {
			console.error('Error disconnecting Sequelize:', error)
		}
	}
	return { healthCheck, syncDb, onSignal }
}

const getTerminusOptions = (clientName, dbClient) => {
	switch (clientName) {
		case 'sequelize':
			return sequelizeHealthCheck(dbClient)
		default:
			return sequelizeHealthCheck(dbClient)
	}
}

export default function serverConfig(
	app,
	dbClient,
	clientName,
	serverInit,
	config
) {
	const { healthCheck, syncDb, onSignal } = getTerminusOptions(
		clientName,
		dbClient
	)
	function beforeShutdown() {
		return new Promise((resolve) => {
			setTimeout(resolve, 15000)
		})
	}

	function onShutdown() {
		console.log('Cleanup finished, server is shutting down')
	}

	function startServer() {
		createTerminus(serverInit, {
			logger: console.log,
			signal: 'SIGINT',
			healthChecks: {
				'/healthcheck': healthCheck,
			},
			onSignal,
			onShutdown,
			beforeShutdown,
		}).listen(config.port, config.ip, () => {
			console.log(
				'Express server listening on %d, in %s mode',
				config.port,
				app.get('env')
			)
		})
	}

	return {
		startServer,
	}
}
