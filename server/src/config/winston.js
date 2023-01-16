import * as winston from 'winston'

const { format, transports } = winston
const formatConfig = format.combine(
  format.errors(),
  format.timestamp(),
  format.simple(),
  format.prettyPrint(),
)
const options = {
  level: process.env.LOG_LEVEL,
  format: format.json(),
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL,
      format: formatConfig,
      handleExceptions: true,
      humanReadableUnhandleException: true
    }),
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),
    new transports.File({ filename: 'logs/error.log', level: 'error', formatConfig })

  ],
  exitOnError: false
}


const logger = winston.createLogger(options)

logger.stream = {
  write: function (message) {
    logger.info(message)
  }
}

export { logger }