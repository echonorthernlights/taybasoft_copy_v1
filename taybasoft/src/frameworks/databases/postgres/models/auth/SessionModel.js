import { DataTypes, Deferrable } from "sequelize"

import createDbClient from "../../createDbClient.js"
import UserModel from "../users/UserModel.js"

const { clientInstance: sequelize } = createDbClient("sequelize")

const SessionModel = sequelize.define("Session", {
  user: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: UserModel,
      key: "id",
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

await SessionModel.sync()

export default SessionModel
