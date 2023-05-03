import winston from "winston";

const { format } = winston;
const { combine, printf, timestamp, colorize } = format;
const logConfiguration = {
  level: "info",
  format: combine(
    timestamp({
      format: "DD-MMM-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);
