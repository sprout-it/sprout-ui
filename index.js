const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require('./config/serviceAccount.json')
const next = require("next");
const bodyParser = require('body-parser')
const isDev = process.env.DEVELOPMENT == 'true' || false
const axios = require('axios')

console.log(process.env.DEVELOPMENT)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const app = next({
    dev: false,
    conf: { distDir: 'nextjs' }
});

const express = require('express');
const cors = require('cors');
const expressServer = express()
const handle = app.getRequestHandler();

expressServer.use(cors({ origin: true }))
expressServer.use(bodyParser.json());

expressServer.all('/proxy/*', async (req, res) => {
    const [endPointUrl] = Object.values(req.params)
    const getData = await axios({
        method: req.method,
        url: endPointUrl,
        data: req.body.length > 0 ? req.body : undefined
    });
    res.send(getData.data)
    res.end()
})

!isDev && expressServer.all('*', async (req, res) => {
    return await handle(req, res)
});

isDev && (async () => {
    try {
        await app.prepare();
        const server = express();
        server.all("*", (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

isDev && expressServer.listen(3000, () => console.log(`Running on port: 3000`))
const server = functions.https.onRequest(expressServer)
exports.nextjs = { server };