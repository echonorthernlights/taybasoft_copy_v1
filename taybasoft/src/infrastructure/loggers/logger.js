import winston from "winston";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Create log directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsDirectory = path.join(__dirname, "..", "..", "..", "logs");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console for all levels
    new winston.transports.File({
      filename: path.join("logs/ApplicationLogs.log"),
      level: "verbose", // support all levels
    }),
  ],
});

export default logger;
