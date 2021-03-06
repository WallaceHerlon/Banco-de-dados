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
const updateProducts = async () => {
    const db = await initDB('banco.sqlite3')
    await run(db, `UPDATE products SET product=? WHERE id=?`, ['prod atualizado', 8])
    // lembrete: apagar tudo de categories_products, adicionar o que ficou
    // ou remover somente quem foi removido, ou adicionar quem foi adicionado. 
    console.log('Products updated!')
}
updateProducts().catch(err => {
    console.log(err)
})
