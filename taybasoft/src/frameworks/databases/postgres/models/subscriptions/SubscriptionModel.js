import { DataTypes, Deferrable } from "sequelize"

import createDbClient from "../../createDbClient.js"
import PackModel from "./PackModel.js"
import SubscriberModel from "./SubscriberModel.js"

const { clientInstance: sequelize } = createDbClient("sequelize")
const SubscriptionModel = sequelize.define(
	"Subscription",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		subscriber: {
			type: DataTypes.UUID,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ subscriber est requis.",
				},
				notEmpty: {
					msg: "Champ subscriber est requis.",
				},
			},
			references: {
				model: SubscriberModel,
				key: "id",
				deferrable: Deferrable.INITIALLY_IMMEDIATE,
			},
		},
		packId: {
			type: DataTypes.UUID,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ packId est requis.",
				},
				notEmpty: {
					msg: "Champ packId est requis.",
				},
			},
			references: {
				model: PackModel,
				key: "id",
				deferrable: Deferrable.INITIALLY_IMMEDIATE,
			},
		},
		projectsList: {
			type: DataTypes.ARRAY(DataTypes.UUID),
			allowNull: true,
			defaultValue: [],
		},
		nbrClients: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		paymentDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ date de paiement est requis.",
				},
				notEmpty: {
					msg: "Champ date de paiement est requis.",
				},
			},
		},
		paymentMethod: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ méthode de paiement est requis.",
				},
				notEmpty: {
					msg: "Champ méthode de paiement est requis.",
				},
			},
		},
		totalAmount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ prix total est requis.",
				},
				notEmpty: {
					msg: "Champ prix total est requis.",
				},
			},
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ date début est requis.",
				},
				notEmpty: {
					msg: "Champ date début est requis.",
				},
			},
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Champ date fin est requis.",
				},
				notEmpty: {
					msg: "Champ date fin est requis.",
				},
			},
		},
		status: {
			type: DataTypes.ENUM,
			values: ["pending", "active", "expired"],
			allowNull: false,
			defaultValue: "pending",
			validate: {
				isIn: {
					args: [["pending", "active", "expired"]],
					msg: "Invalide valeur pour status.",
				},
			},
		},
	}
	// {
	// 	hooks: {
	// 		beforeUpdate: (subscription) => {
	// 			if (subscription.startDate) {
	// 				subscription.startDate = sequelize.fn(
	// 					"TO_DATE",
	// 					subscription.startDate,
	// 					"YYYY-MM-DD"
	// 				)
	// 			}

	// 			if (subscription.endDate) {
	// 				subscription.endDate = sequelize.fn(
	// 					"TO_DATE",
	// 					subscription.endDate,
	// 					"YYYY-MM-DD"
	// 				)
	// 			}

	// 			if (subscription.paymentDate) {
	// 				subscription.paymentDate = sequelize.fn(
	// 					"TO_DATE",
	// 					subscription.paymentDate,
	// 					"YYYY-MM-DD"
	// 				)
	// 			}
	// 		},
	// 	},
	// }
)

SubscriptionModel.belongsTo(PackModel, { foreignKey: "packId" })
await SubscriptionModel.sync({ alter: true })

export default SubscriptionModel
