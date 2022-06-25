const db = require('./db')

const init = database => {

    const create = async (data) => {
        const dbConn = await db.init(database)
        await db.queryWithParams(dbConn, `INSERT INTO products (id, product, price) VALUES (?, ?, ?)`, data)
    }

    const findAll = async () => {
        const dbConn = await db.init(database)
        //return await db.query(dbConn, `SELECT * FROM  products LEFT JOIN images ON products.id = images.product_id GROUP BY images.product_id`)
        const products = await db.query(dbConn, `SELECT * FROM products`)
        const condition = products.map(produto => produto.id).join(',')
        const images = await db.query(dbConn, 'SELECT * FROM images WHERE product_id IN (' + condition + ') GROUP BY product_id')
        const mapImages = images.reduce((antigo, atual) => {
            return {
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})
        return products.map(product => {
            return {
                ...product,
                image: mapImages[product.id]
            }
        })
    }

    const findAllByCategory = async (categoryId) => {
        const dbConn = await db.init(database)
        //return await db.query(dbConn, `SELECT * FROM  products LEFT JOIN images ON products.id = images.product_id GROUP BY images.product_id`)
        const products = await db.query(dbConn, `SELECT * FROM products WHERE id IN (SELECT product_id FROM categories_products WHERE category_id = ${categoryId})`)
        const condition = products.map(produto => produto.id).join(',')
        const images = await db.query(dbConn, 'SELECT * FROM images WHERE product_id IN (' + condition + ') GROUP BY product_id')
        const mapImages = images.reduce((antigo, atual) => {
            return {
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})
        return products.map(product => {
            return {
                ...product,
                image: mapImages[product.id]
            }
        })
    }

    const remove = async (id) => {
        const dbConn = await db.init(database)
        await db.queryWithParams(dbConn, `DELETE FROM products WHERE id = ?`, [id])
        await db.queryWithParams(dbConn, `DELETE FROM images WHERE product_id = ?`, [id])
        await db.queryWithParams(dbConn, `DELETE FROM categories_products WHERE product_id = ?`, [id])
    }

    const update = async (id, data) => {
        const dbConn = await db.init(database)
        await db.queryWithParams(dbConn, `UPDATE products SET product=?, price=? WHERE id=?`, [...data, id])
    }

    const updateCategories = async (id, categories) => {
        const dbConn = await db.init(database)
        await db.queryWithParams(dbConn, `DELETE FROM categories_products WHERE product_id = ?`, [id])
        for await (const category of categories) {
            await db.queryWithParams(dbConn, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?)`, [id, category])
        }
    }

    const addImage = async (productId, data) => {
        const dbConn = await db.init(database)
        await db.queryWithParams(dbConn, `INSERT INTO images (id, description, url, product_id) values (?, ?, ?, ?)`, [...data, productId])
    }

    const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
        const dbConn = await db.init(database)
        const records = await db.query(dbConn, `SELECT * FROM  products LIMIT  ${currentPage * pageSize}, ${pageSize + 1}`)
        const hasNext = records.length > pageSize
        if (records.length > pageSize) {
            records.pop()
        }
        const condition = records.map(produto => produto.id).join(',')
        const images = await db.query(dbConn, 'SELECT * FROM images WHERE product_id IN (' + condition + ') GROUP BY product_id')
        const mapImages = images.reduce((antigo, atual) => {
            return {
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})
        return {
            data: records.map(product => {
                return {
                    ...product,
                    image: mapImages[product.id]
                }
            }),
            hasNext
        }
    }
    return {
        findAll,
        findAllByCategory,
        findAllPaginated,
        remove,
        create,
        update,
        addImage,
        updateCategories
    }
}

module.exports = init