const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise((resolve, reject) => {
    const db = new sqlite.Database('banco.sqlite3', (err) => {
        if (err) {
            reject(err)
        } else {
            resolve(db)
        }
    })
})
const run = (db, query, values) => new Promise((resolve, reject) => {
    db.run(query, values, err => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
})
const createProducts = async () => {
    const db = await initDB('banco.sqlite3')
    await run(db, `INSERT INTO products (id, product) VALUES (?, ?)`, [8, 'prod 8'])
    await run(db, `INSERT INTO categories_products (category_id, product_id) VALUES (?, ?)`, [8, 8])

    console.log('Products created!')
}
createProducts().catch(err => {
    console.log(err)
})
