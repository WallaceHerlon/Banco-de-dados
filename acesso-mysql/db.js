const mysql = require('mysql2/promise')

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3312,
    database: 'cat-products'
})
