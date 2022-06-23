const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

//Referenciado product em images
const productId = '7eoOttq6N00gInjX3EfW'
const imageRef = db.collection('products').doc(productId).collection('images').doc()

imageRef
    .set({
        description: 'my description',
        url: 'my image url'
    })
    .then(snap => {
        console.log(snap)
    })