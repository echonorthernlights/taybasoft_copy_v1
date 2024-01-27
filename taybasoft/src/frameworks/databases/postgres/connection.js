import createSequelizeClient from "./sequelizeClient.js";
export default function connection() {
  const sequelize = createSequelizeClient();

  async function connectToDatabase() {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Database error", error);
    }
  }

  const syncDB = async () => {
    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  };
  syncDB();

  return { connectToDatabase, sequelize };
}
