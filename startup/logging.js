const winston = require("winston");
require("express-async-errors");

module.exports = function () {
    process.on("unhandledRejection", (ex) => {
    throw ex;
    });

    winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions" })
    ); //To be rechecked

    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(new winston.transports.Console())
    //can also log to db using winston-mongodb
};
