import { DataTypes, Deferrable } from "sequelize"

import hashPassword from "../../../../../utils/hashPassword.js"
import createDbClient from "../../createDbClient.js"
import SubscriberModel from "../subscriptions/SubscriberModel.js"
import RoleModel from "./RoleModel.js"

const { clientInstance: sequelize } = createDbClient("sequelize")
const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Champ prenom est requis.",
        },
        notEmpty: {
          msg: "Champ prenom est requis.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Champ nom est requis.",
        },
        notEmpty: {
          msg: "Champ nom est requis.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Champ user email doit être unique.",
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPasswordWithinLength(value) {
          if (value.length < 8 || value.length > 20) {
            throw new Error("Password must be between 8 and 20 characters.")
          }
        },
        // len: [8, 20],
        notNull: {
          msg: "Champ mot de passe est requis.",
        },
        notEmpty: {
          msg: "Champ mot de passe est requis.",
        },
      },
    },
    role: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Champ role est requis.",
        },
        notEmpty: {
          msg: "Champ role est requis.",
        },
      },
      references: {
        model: RoleModel,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    subscriber: {
      type: DataTypes.UUID,
      references: {
        model: SubscriberModel,
        key: "id",
        deferrable: Deferrable.INITIALLY_DEFERRED,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: "Champ status est requis.",
        },
        notEmpty: {
          msg: "Champ status est requis.",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await hashPassword(user.password)
      },
      beforeUpdate: async (user, options) => {
        if (user.changed("password")) {
          user.password = await hashPassword(user.password)
        }
      },
    },
  }
)

// UserModel.hasOne(RoleModel)
// UserModel.belongsTo(SubscriberModel, { foreignKey: "subscriber" })
UserModel.belongsTo(RoleModel, { foreignKey: "role" })
await UserModel.sync({ alter: true })

export default UserModel
