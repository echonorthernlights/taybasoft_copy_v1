import { DataTypes } from "sequelize"

import createDbClient from "../../createDbClient.js"

const { clientInstance: sequelize } = createDbClient("sequelize")
const PackModel = sequelize.define("Pack", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ désignation est requis.",
      },
      notEmpty: {
        msg: "Champ désignation est requis.",
      },
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ durée est requis.",
      },
      notEmpty: {
        msg: "Champ durée est requis.",
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ prix est requis.",
      },
      notEmpty: {
        msg: "Champ prix est requis.",
      },
    },
  },
  promotion: {
    type: DataTypes.FLOAT,
    allowNull: true,
    default: 0,
  },
  nbrProjects: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ nombre projet est requis.",
      },
      notEmpty: {
        msg: "Champ nombre projet est requis.",
      },
    },
  },
  nbrClients: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Champ nombre client est requis.",
      },
      notEmpty: {
        msg: "Champ nombre client est requis.",
      },
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
})

await PackModel.sync()

export default PackModel
