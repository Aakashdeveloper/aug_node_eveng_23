const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

const db = admin.firestore()

exports.addCiti = functions.https.onRequest(async(request, response) => {
  const citiRef = db.collection('Aug23')
  await citiRef.doc('Pune').set({
      "name":"Pune","country":"India"
  })

  response.send('Data Added')
});

exports.getCiti = functions.https.onRequest(async(request, response) => {
    const citiRef = db.collection('Aug23')
    const snapshot = await citiRef.get('data');
    const out = [];
    snapshot.forEach(doc  => {
        out.push(doc.data())
    })
    response.send(out)
  });
  
