const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const test = async () => {
    //await categories.create(['New category from api'])
    //await categories.remove(6)
    //await categories.update(2, ['update from API'])
    //const cats = await categories.findAll()
    //console.log(cats)

    //await products.addImage(3, ['img test', 'url'])
    //const prods = await products.findAllByCategory(1)
    //const prods = await products.findAllPaginated({ pageSize: 1, currentPage: 4})
    //console.log(prods)
    //await products.updateCategories(3, [6])

    for (let i = 0; i < 1000; i++) {
        products.findAllPaginated().then(prods => console.log(prods))
    }






}
test()