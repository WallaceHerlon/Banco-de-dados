const categories = require('./categories')
const products = require('./products')

const testes = async () => {

    //await categories.create({
    //   categories: 'Nova categoria'
    //})

    //await categories.update('9utK7HW76JICWdA6JfKc', { category: 'Eletrônicos' })

    //await categories.remove('tqWktL0aJIyoQHbDHS5u')

    //const cats2 = await categories.findAll()
    //console.log(cats2)

    //const cats = await categories.findAllPaginated({ pageSize: 1, startAfter: 'SmartTVs' })
    //console.log(cats)

    //await products.create({
    //    products: 'Monitor',
    //    price: 997,
    //    categories: ['Jy3IL46b14EIcBE3sin2']
    //})
    
    //await products.remove('QO30l8EphZLGBcGXpRF0')

    const prods = await products.findAll()
    console.log(prods)
}

testes()