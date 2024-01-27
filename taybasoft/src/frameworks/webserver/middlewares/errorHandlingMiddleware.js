import logger from "../../../infrastructure/loggers/logger.js";
export const notFoundError = (req, res, next) => {
  const error = new Error();
  error.message = `Not found url! '${req.originalUrl}'`;
  error.status = "error";
  res.status(404);
  next(error);
};

// Handles development errore
// sends back the error message, and additional information about the error
const developmentError = (err, res) => {
  const error = { ...err };
  res.status(err.statusCode).json({
    errors: error?.errors || [
      { message: error.message, code: error.statusCode },
    ],
  });
};

// exports the function that handles the error
export const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let error = { ...err };
  error.statusCode = error.statusCode || statusCode;
  error.status = error.status || "error";

  const errorsList = [];

  // format Sequelize errors
  if (error.name && error.name.includes("Sequelize")) {
    logger.info(` Errors List Start`);
    if (error.errors) {
      error.errors.map((err) => {
        errorsList.push({
          message: err.message.replace(".", " "),
          code: statusCode,
        });
        logger.error(
          `\t\t - ${err.message.replace(
            ".",
            " "
          )} | status code : ${statusCode} `
        );
      });
    } else {
      errorsList.push({ message: error.original.detail, code: statusCode });
    }
    logger.info(` Errors List End`);
  }
  if (errorsList.length > 0) error.errors = [...errorsList];

  if (error.statusCode == "404") {
    logger.info(`  Routes Errors Start `);
    logger.http(
      `\t\t - Not found! ${req.originalUrl} | status code : ${error.statusCode} `
    );
    logger.info(`  Routes Errors End `);
  }

  developmentError(error, res);
};
