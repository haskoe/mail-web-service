const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

function startExpressApp(port, makeRoutes) {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/", router);

    makeRoutes(router)

    app.listen(port, () => {
        console.log(`Started on PORT ${process.env.WEB_SERVER_PORT}`);
    })
}

module.exports = {
    startExpressApp: startExpressApp
}
