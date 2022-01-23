const nodemailer = require('nodemailer')

const PASS = ''

const smtpOptions = {
    host: 'send.one.com',
    port: 465,
    user: 'henrik@.dk',
    pass: PASS
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

app.listen(3000, () => {
    console.log("Started on PORT 3000");
})

// httpie
// http --form POST http://localhost:3000 from="henrik@haskoe.dk" to="aps@haskoe.dk" subject="subject 1" text="testing"
// http --form POST http://localhost:3000/mail from="henrik@haskoe.dk" to="aps@haskoe.dk" subject="subject 1" html="<body>abe</body>"