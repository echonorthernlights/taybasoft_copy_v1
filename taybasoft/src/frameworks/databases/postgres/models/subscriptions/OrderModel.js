import { DataTypes, Deferrable } from "sequelize"

import createDbClient from "../../createDbClient.js"
import SubscriptionModel from "./SubscriptionModel.js"

const { clientInstance: sequelize } = createDbClient("sequelize")
const OrderModel = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subscription: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ subscription est requis.",
      },
      notEmpty: {
        msg: "Champ subscription est requis.",
      },
    },
    references: {
      model: SubscriptionModel,
      key: "id",
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  paymentDate: {
    type: DataTypes.DATE,
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
  totalOrder: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ total de la commande est requis.",
      },
      notEmpty: {
        msg: "Champ total de la commande est requis.",
      },
    },
  },
})

await OrderModel.sync()

export default OrderModel
