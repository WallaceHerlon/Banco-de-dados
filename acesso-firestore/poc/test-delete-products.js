const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const produtId = '7eoOttq6N00gInjX3EfW'

const productRef = db.collection('products').doc(produtId)

db.collection('products').doc(produtId).collection('images').get()

.then(imgSnapshot => {
const exclusoes = []
    imgSnapshot.forEach(img => {
        exclusoes.push(db.collection('products').doc(produtId).collection('images').doc(img.id).delete())   
    })
    return Promise.all(exclusoes)
})
.then(() => {
    return productRef.delete()
})
.then(() => {
    console.log('everything was deleted')
})
