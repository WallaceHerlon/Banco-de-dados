const mysql = require('mysql2/promise')

const run = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 3312,
            database: 'cat-products'
        })

        try {
            const [results, fields] = await connection.query('SELECT * FROM products')
            console.log('Products', results)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
}
run()