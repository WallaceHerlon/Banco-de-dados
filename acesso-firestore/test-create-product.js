const admin = require('firebase-admin')

const serviceAccount = require('./firestore.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

//Referenciado category em product
const cat1 = 'OiWLLzQxrFWFv9TCJLkG'
const catRef = db.collection('categories').doc(cat1)

const doc = db.collection('products').doc()
doc
    .set({
        products: 'Nome product',
        price: 2000,
        categories: [catRef]
    })
    .then(snap => {
        console.log(snap)
    })