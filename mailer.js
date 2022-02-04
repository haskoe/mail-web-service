const nodemailer = require('nodemailer')
require('dotenv').config()

const MAX_BODY_LENGTH = 50000

function smtpOptionsFromEnv() {
    return {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD
    }
}

function createSmtpTransport(smtpOptions) {
    return nodemailer.createTransport({
        host: smtpOptions.host,
        port: smtpOptions.port,
        auth: {
            user: smtpOptions.user,
            pass: smtpOptions.pass
        }
    })
}

function createSmtpTransportFromEnv() {
    return createSmtpTransport(smtpOptionsFromEnv())
}

function sendMail(transporter, mailOptions, callBack) {
    const errMsg = validateMailOptions(mailOptions)
    if (errMsg) {
        callBack(errMsg)
    }
    else {
        transporter.verify(function (error, success) {
            if (error) {
                callBack(error)
            } else {
                transporter.sendMail(mailOptions, function (error, info) {
                    callBack(error)
                });
            }
        });
    }
}

function verifyConnection(transporter, callback) {
    transporter.verify(function (error, success) {
        if (error) {
            callback(error)
        } else {
            callback('')
        }
    })
}

function isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
}

const mailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
function validateMailOptions(mailOptions) {
    if (!isDict(mailOptions))
        return 'invalid mailOptions object'

    if (!mailRegex.test(mailOptions.from || ''))
        return 'Invalid from e-mail'

    if (!mailRegex.test(mailOptions.to || ''))
        return 'Invalid to e-mail'

    if (!(mailOptions.subject || ''))
        return 'subject must be non-empty'

    if (!(mailOptions.text || mailOptions.html))
        return 'either text or html must be non-empty'

    if ((mailOptions.text || mailOptions.html).length >= MAX_BODY_LENGTH)
        return `mail body size must be less than {MAX_BODY_LENGTH}`

    return ''
}

function defaultSendMail(mailOptions, callBack) {
    sendMail(createSmtpTransportFromEnv(), mailOptions, callBack)
}

module.exports = {
    validateMailOptions: validateMailOptions,
    createSmtpTransport: createSmtpTransport,
    createSmtpTransportFromEnv: createSmtpTransportFromEnv,
    verifyConnection: verifyConnection,
    sendMail: sendMail,
    defaultSendMail: defaultSendMail
}
