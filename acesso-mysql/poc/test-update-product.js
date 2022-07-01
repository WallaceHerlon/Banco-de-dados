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
            const [results, fields] = await connection.query('UPDATE products SET product = ?, price=? WHERE id = ?', ['New product', 299, 3])
            console.log(results, fields)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
}
run()