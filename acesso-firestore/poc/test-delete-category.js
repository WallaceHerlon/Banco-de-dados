const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const doc = db.collection('categories').doc('iJgFUA8exMmXrTT5jMEB')
doc
    .delete()
    .then(snap => {
        console.log(snap)
    })