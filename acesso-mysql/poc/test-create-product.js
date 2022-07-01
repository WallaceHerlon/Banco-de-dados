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
            const [results] = await connection.query('INSERT INTO products (product, price) VALUES (?, ?)', ['Produto 5', 577])
            await connection.query('INSERT INTO categories_products (product_id, category_id) VALUES (?,?)', [results.insertId, 2])
            console.log(results, fields)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
}
run()