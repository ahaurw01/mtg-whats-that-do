const functions = require('firebase-functions');

exports.echo = functions.https.onRequest((req, res) => {
  res.send(req.query.text);
});
