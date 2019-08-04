const winston = require('winston');

const logger = winston.createLogger({
  levels: {
    err: 0,
    warn: 1,
    info: 2,
  },
  defaultMeta: { date: new Date().toLocaleString() },
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './log/err.log', level: 'err' }),
    new winston.transports.File({ filename: './log/warning.log', level: 'warn' }),
    new winston.transports.File({ filename: './log/info.log', level: 'info' }),
    new winston.transports.File({ filename: './log/server.log' }),
  ]
});

module.exports = logger
