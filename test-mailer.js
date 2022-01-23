const mailer = require('./mailer')

mailer.verifyConnection( mailer.createSmtpTransportFromEnv(), (error) => console.log(error || 'success'))