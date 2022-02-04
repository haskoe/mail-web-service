const winston = require('winston')

// winston.add(require('winston-irc'), {
//     host: 'open.ircnet.net',
//     nick: 'logger',
//     pass: 'hunter2',
//     channels: {
//         '#strateku': true,
//         'sysadmin': ['warn', 'error']
//     }
// })

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.Irc({ level: 'info' })
    ],
});

logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

module.exports = {
    logger: logger
}
