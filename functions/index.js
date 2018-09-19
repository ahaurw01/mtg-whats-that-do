const crypto = require('crypto');
const functions = require('firebase-functions');
const express = require('express');
const shortId = require('shortid');

const app = express();

app.post('/share', makeShareCode);
app.get('/share/:code', getShare);

const runtimeOpts = {
  timeoutSeconds: 20,
  memory: '128MB',
};
exports.share = functions.https.onRequest(app);

function makeShareCode(req, res) {
  const code = shortId.generate();
  const { cardNames } = req.body;

  res.send({ code, cardNames });
}

function getShare(req, res) {
  res.send(req.params.code);
}
