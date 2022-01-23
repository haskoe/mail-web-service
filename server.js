const nodemailer = require('nodemailer')
require('dotenv').config()

const PASS = ''

const smtpOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD
}

function createSmtpTransport(smtpOptions) {
    return nodemailer.createTransport({
        host: smtpOptions.host,
        port: smtpOptions.port,
        auth: {
            user: smtpOptions.user,
            pass: smtpOptions.pass
        }
    });
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

function defaultSendMail(mailOptions, callBack) {
    sendMail(createSmtpTransport(smtpOptions), mailOptions, callBack)
}

function expressSendMail(mailOptions, response) {
    defaultSendMail(mailOptions, function (errMsg) {
        response.end(errMsg)
    });
}

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

router.post('/mail', (req, res) => {
    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.to,
        text: req.body.text || '',
        html: req.body.html || ''
    };
    expressSendMail(mailOptions, res)
})

app.listen(process.env.WEB_SERVER_PORT, () => {
    console.log(`Started on PORT ${process.env.WEB_SERVER_PORT}`);
})

// httpie
// http --form POST http://localhost:3000 from="henrik@haskoe.dk" to="aps@haskoe.dk" subject="subject 1" text="testing"
// http --form POST http://localhost:3000/mail from="henrik@haskoe.dk" to="aps@haskoe.dk" subject="subject 1" html="<body>abe</body>"
