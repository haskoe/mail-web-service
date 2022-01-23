const mailer = require('./mailer')

function expressSendMailDefault(mailOptions, response) {
    mailer.defaultSendMail(mailOptions, function (errMsg) {
        response.end(errMsg || '')
    });
}

function expressSendMail(transporter, mailOptions, response) {
    mailer.SendMail( transporter, mailOptions, function (errMsg) {
        response.end(errMsg || '')
    });
}

module.exports = {
    expressSendMailDefault: expressSendMailDefault,
    expressSendMail: expressSendMail
}