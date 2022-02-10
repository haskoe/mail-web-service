const mailer = require('./mailer')

function expressSendMailDefault(mailOptions, response) {
    mailer.defaultSendMail(mailOptions, function (errMsg) {
        console.log(new Date().toISOString(), errMsg || 'mail sent')
        response.end(errMsg || '')
    });
}

function expressSendMail(transporter, mailOptions, response) {
    const validateMsg = validateMailOptions(mailOptions)
    if (validateMsg) {
        response.end(validateMsg)
    }
    else {
        mailer.SendMail(transporter, mailOptions, function (errMsg) {
            response.end(errMsg || '')
        });
    }
}

module.exports = {
    expressSendMailDefault: expressSendMailDefault,
    expressSendMail: expressSendMail
}
