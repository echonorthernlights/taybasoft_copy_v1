import { DataTypes, Deferrable } from "sequelize"

import createDbClient from "../../createDbClient.js"

const { clientInstance: sequelize } = createDbClient("sequelize")
const RoleModel = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ role est requis.",
      },
      notEmpty: {
        msg: "Champ role est requis.",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      //   notNull: {
      //     msg: "Champ nom est requis.",
      //   },
    },
  },
})

await RoleModel.sync({ alter: true })

export default RoleModel
