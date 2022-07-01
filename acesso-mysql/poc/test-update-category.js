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
            const [results, fields] = await connection.query('UPDATE categories SET category = (?) WHERE id = (?)', ['New category', 4])
            console.log(results, fields)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
}
run()