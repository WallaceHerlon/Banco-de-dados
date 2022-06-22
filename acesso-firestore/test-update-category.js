const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const doc = db.collection('categories').doc('9utK7HW76JICWdA6JfKc')
doc
    .update({
        category: 'Diversos'
    })
    .then(snap => {
        console.log(snap)
    })