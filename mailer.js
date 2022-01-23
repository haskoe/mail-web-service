const nodemailer = require('nodemailer')
require('dotenv').config()

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
    const errMsg = ''
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

function verifyConnection(transporter, callback) {
    transporter.verify(function (error, success) {
        if (error) {
            callback(error)
        } else {
            callback('')
        }
    })
}

function defaultSendMail(mailOptions, callBack) {
    sendMail(createSmtpTransportFromEnv(), mailOptions, callBack)
}

module.exports = {
    createSmtpTransport: createSmtpTransport,
    createSmtpTransportFromEnv: createSmtpTransportFromEnv,
    verifyConnection: verifyConnection,
    sendMail: sendMail,
    defaultSendMail: defaultSendMail
}
