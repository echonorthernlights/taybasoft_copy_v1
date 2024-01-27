import { DataTypes } from "sequelize"
import createDbClient from "../../createDbClient.js"
// import UserModel from "../users/UserModel.js"
// const { UserModel } = await import("../users/UserModel.js")

const { clientInstance: sequelize } = createDbClient("sequelize")

const SubscriberModel = sequelize.define("Subscriber", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Champ raison sociale doit être unique.",
    },
    validate: {
      notNull: {
        msg: "Champ raison sociale est requis.",
      },
      notEmpty: {
        msg: "Champ raison sociale est requis.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Champ email doit être unique.",
    },
    validate: {
      notNull: {
        msg: "Champ email est requis.",
      },
      notEmpty: {
        msg: "Champ email est requis.",
      },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notNull: {
        msg: "Champ adresse est requis.",
      },
      notEmpty: {
        msg: "Champ adresse est requis.",
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notNull: {
        msg: "Champ telephone est requis.",
      },
      notEmpty: {
        msg: "Champ telephone est requis.",
      },
    },
  },
  subscriptionStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

// SubscriberModel.hasMany(UserModel, {
// 	onDelete: "CASCADE",
// 	hooks: true,
// 	foreignKey: "subscriber",
// })

// SubscriberModel.beforeDestroy(async (subscriber) => {
// 	await UserModel.destroy({ where: { subscriber: subscriber.id } })
// })

await SubscriberModel.sync()

export default SubscriberModel
