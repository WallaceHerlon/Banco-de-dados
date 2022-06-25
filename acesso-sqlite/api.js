const categories = require('./categories')('/banco.sqlite3')
const products = require('./products')('/banco.sqlite3')

const test = async () => {
    //await categories.create([2, 'Eletrônico'])
    //await categories.create([3, 'Moveis'])
    //await categories.create([4, 'Sofá'])
    //await categories.create([5, 'Cozinha'])
    //await categories.create([6, 'Tv'])
    //await categories.remove(8)
    //await categories.update(1, ['Acessórios'])
    //console.log(await categories.findAll())
    //console.log('cp: 0', await categories.findAllPaginated({ pageSize: 2, currentPage: 0 }))
    //console.log('cp: 1', await categories.findAllPaginated({ pageSize: 2, currentPage: 1 }))
    //console.log('cp: 2', await categories.findAllPaginated({ pageSize: 2, currentPage: 2 }))


    //await products.create([, 'Caderno', 20])
    //await products.addImage(2, [2, '<url>', '<desc>'])
    //await products.update(3, ['cabo HDMI', 99])
    //await products.remove(8)
    // console.log(await products.findAll())
    //console.log('cp: 0', await products.findAllPaginated({ pageSize: 2, currentPage: 0 }))
    //await products.updateCategories(1, [1])
    console.log(await products.findAllByCategory(3))
}

test()