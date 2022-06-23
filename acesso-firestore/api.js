const categories = require('./categories')

const testes = async () => {

    /*await categories.create({
        categories: 'Nova categoria'
    })*/

    await categories.update('9utK7HW76JICWdA6JfKc', { category: 'Eletrônicos' })

    //await categories.remove('tqWktL0aJIyoQHbDHS5u')

    const cats = await categories.findAll()
    console.log(cats)
}

testes()