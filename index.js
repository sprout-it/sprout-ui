const admin = require("firebase-admin");
const functions = require("firebase-functions");
const next = require("next");
const config = require("./next.config");
const bodyParser = require('body-parser')
var serviceAccount = require("./config/serviceAccount.json");

admin.initializeApp(serviceAccount)

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev: false,
    conf: config,
});
const handle = app.getRequestHandler();
const express = require('express');
const cors = require('cors');
const expressServer = express()
const adminServer = express()

expressServer.disable('x-powered-by');
expressServer.use(cors());
expressServer.use(bodyParser.json());

// expressServer.all('*', (req, res) => {
//     return handle(req, res)
// });

const server = functions.https.onRequest(async (req, res) => {
    return app.prepare().then(() => handle(req,res))
})

exports.nextjs = { server };