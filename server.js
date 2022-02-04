const expressServer = require('./express-server')
const expressMailer = require('./express-mailer')
const mailer = require('./mailer')

function createRoutes(router) {
    router.post('/mail', (req, res) => {
        const mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text || '',
            html: req.body.html || ''
        }
        expressMailer.expressSendMailDefault(mailOptions, res)
    })

    router.get('/alive', (req, res) => { res.end('alive') })
}

mailer.verifyConnection(mailer.createSmtpTransportFromEnv(), function (error) {
    if (error)
        console.log(error)
    else
        expressServer.startExpressApp(process.env.WEB_SERVER_PORT, createRoutes)
})
