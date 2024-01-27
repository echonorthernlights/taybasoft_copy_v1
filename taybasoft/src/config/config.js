import dotenv from 'dotenv'
dotenv.config()

const getConfigByEnv = async (env) => {
	switch (env) {
		case 'development':
			return {
				port: process.env.PORT || 5000,
				ip: process.env.HOST || '0.0.0.0',
				jwt: {
					accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
					refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
					jwtSecret: process.env.JWT_SECRET,
				},
				dbConfig: {
					database: 'taybasoft_dev_db',
					username: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD,
					host: 'localhost',
					dialect: 'postgres',
				},
			}
		case 'production':
			return {
				port: process.env.PORT || 5000,
				ip: process.env.HOST || '0.0.0.0',
				jwt: {
					accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
					refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
					jwtSecret: process.env.JWT_SECRET,
				},
				dbConfig: {
					database: 'taybasoft_dev_db',
					username: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD,
					host: 'localhost',
					dialect: 'postgres',
				},
			}
	}
}

const config = await getConfigByEnv(process.env.NODE_ENV)

export default config

