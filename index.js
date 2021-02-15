const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require('./config/serviceAccount.json')
const next = require("next");
// const bodyParser = require('body-parser')
const isDev = process.env.development == 'true' || false
console.log(process.env.development)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

// const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev: isDev,
    conf: { distDir: 'nextjs' }
});

const express = require('express');
const cors = require('cors');
const expressServer = express()

const handle = app.getRequestHandler();
expressServer.use(cors({ origin: true }))

// expressServer.use(cors());
// expressServer.use(bodyParser.json());

expressServer.all('*', (req, res) => {
    return handle(req, res)
});

// expressServer.listen(80, () => console.log('listen at 80'))

// const server = functions.https.onRequest((req, res) => {
//     return app.prepare().then(() => handle(req, res))
// })
isDev && expressServer.listen(3000, ()=>console.log(`Running on port: 3000`))
const server = functions.https.onRequest(expressServer)

exports.nextjs = { server };