const crypto = require('crypto');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const shortId = require('shortid');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

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

  const docRef = db
    .collection('shares')
    .doc(code)
    .set({ cardNames })
    .then(() => res.send({ code }))
    .catch(err => res.status(500).send(err));
}

function getShare(req, res) {
  const { code } = req.params;

  db
    .collection('shares')
    .doc(code)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.sendStatus(404);
      } else {
        return res.send(doc.data());
      }
    })
    .catch(err => res.status(500).send(err));
}
