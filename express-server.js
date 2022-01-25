const http = require('http')
const express = require('express')
const { createTerminus } = require('@godaddy/terminus')
const router = express.Router();
const bodyParser = require('body-parser');

function onSignal() {
    console.log('server is starting cleanup')
}

async function onHealthCheck() {
    // todo: verify mail connection
}

function startExpressApp(port, makeRoutes) {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/", router);

    makeRoutes(router)

    const server = http.createServer(app)

    createTerminus(server, {
        signal: 'SIGINT',
        healthChecks: { '/healthcheck': onHealthCheck },
        onSignal
    })

    server.listen(port, () => {
        console.log(`Started on PORT ${port}`);
    })
}

module.exports = {
    startExpressApp: startExpressApp
}

