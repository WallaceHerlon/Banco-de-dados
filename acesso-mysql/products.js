const init = connection => {
    const create = async (data) => {
        const conn = await connection
        await conn.query('INSERT INTO products (product, price) VALUES (?, ?)', data)
    }

    const remove = async (id) => {
        const conn = await connection
        await conn.query('DELETE FROM products WHERE id = ? LIMIT 1', [id])
    }
    const update = async (id, data) => {
        const conn = await connection
        await conn.query('UPDATE products SET product = ? WHERE id = ?', [...data, id])
    }
    const findImages = async (results) => {
        const conn = await connection
        const productIds = results.map(product => product.id).join(',')
        const [images] = await conn.query('select * FROM images WHERE product_id IN (' + productIds + ') GROUP BY product_id')
        const mapImages = images.reduce((anterior, atual) => {
            return {
                ...anterior,
                [atual.product_id]: atual
            }
        }, {})

        const products = results.map(product => {
            return {
                ...product,
                images: mapImages[product.id]
            }
        })
        return products
    }
    const findAll = async () => {
        const conn = await connection
        const [results] = await conn.query('SELECT * FROM products')
        return findImages(results)
    }
    const findAllPaginated = async ({ pageSize = 10, currentPage = 0 } = {}) => {
        const conn = await connection
        const [results] = await conn.query(`select * FROM products LIMIT ${currentPage * pageSize}, ${pageSize + 1}`)
        const hasNext = results.length > pageSize

        if (results.length > pageSize) {
            results.pop()
        }
        const resultsWithImages = await findImages(results)

        return {
            data: resultsWithImages,
            hasNext
        }
    }
    const findAllByCategory = async (categoryId) => {
        const conn = await connection
        const [results] = await conn.query('select * from products where id in (select product_id from categories_products where category_id = ?)', [categoryId])
        return findImages(results)
    }
    const addImage = async (productId, data) => {
        const conn = await connection
        await conn.query('insert into images (product_id, description, url) VALUES (?,?,?)', [productId, ...data])
    }
    const updateCategories = async (productId, categoryIds) => {
        const conn = await connection
        await conn.query('START TRANSACTION')
        await conn.query('DELETE FROM categories_products WHERE product_id = ?', [productId])
        for await (const categoryId of categoryIds) {
            await conn.query('INSERT INTO categories_products (category_id, product_id) VALUES (?,?)', [categoryId, productId])
        }
        await conn.query('COMMIT') // ROLLBACK
    }

    return {
        create,
        remove,
        update,
        updateCategories,
        findAll,
        findAllPaginated,
        findAllByCategory,
        addImage
    }
}
module.exports = init