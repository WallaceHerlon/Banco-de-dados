const db = require('./db')

const create = async (data) => {
    const dbConn = await db.init('./banco.sqlite3')
    await db.queryWithParams(dbConn, `INSERT INTO categories (id, category) VALUES (?, ?)`, data)
}

const findAll = async () => {
    const dbConn = await db.init('./banco.sqlite3')
    return await db.query(dbConn, `SELECT * FROM  categories`)
}

const remove = async (id) => {
    const dbConn = await db.init('./banco.sqlite3')
    await db.queryWithParams(dbConn, `DELETE FROM categories WHERE id = ?`, [id])
}

const update = async (id, data) => {
    const dbConn = await db.init('./banco.sqlite3')
    await db.queryWithParams(dbConn, `UPDATE categories SET category=? WHERE id=?`, [...data, id])
}

const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
    const dbConn = await db.init('./banco.sqlite3')
    const records =  await db.query(dbConn, `SELECT * FROM  categories LIMIT  ${currentPage * pageSize}, ${pageSize + 1}`)
    if(records.length > pageSize){
        records.pop()
    }
    return {
        data: records,
        hasNext: records.length > pageSize
    }
}


module.exports = {
    findAll,
    findAllPaginated,
    remove,
    create,
    update
}