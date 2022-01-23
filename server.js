const expressServer = require('./express-server')
const expressMailer = require('./express-mailer')

function createRoutes(router) {
    router.post('/mail', (req, res) => {
        const mailOptions = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.to,
            text: req.body.text || '',
            html: req.body.html || ''
        }
        expressMailer.expressSendMailDefault(mailOptions, res)
    })

}
expressServer.startExpressApp(process.env.WEB_SERVER_PORT, createRoutes)
