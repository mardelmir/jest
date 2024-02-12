let products = [];
let id = 0;

const resetProducts = () => { products = []; id = 0 }
const getProducts = () => products

function addProduct(name, price) {
    if (!name && !price) { throw new Error('Name and price of the product must be provided') }
    else if (!name && price) { throw new Error('Name of the product must be provided') }
    else if (name && !price) { throw new Error('Price of the product must be provided') }

    if (products.length === 0) {
        const newProduct = { id: id, name: name, price: price }
        products.push(newProduct)
        id++
        return products
    }
    else if (products.length >= 1) {
        const duplicate = products.find(p => p.name === name && p.price == price)
        if (duplicate === true) { throw new Error('This item already exists') }

        const newProduct = { id: id, name: name, price: price }
        products.push(newProduct)
        id++
        return products
    }
}

function removeProduct(id) {
    if (products.length === 0) {
        throw new Error('Cannot remove a product from an empty list')
    } else if (products.length >= 1) {
        const foundId = products.find(p => p.id == id)
        if (foundId === undefined) { throw new Error('Cannot remove a product that does not exist') }

        products.splice(1, id)
        return products
    }
}

function getProduct(id) {
    const foundId = products.find(p => p.id == id)

    if (products.length === 0) {
        throw new Error('Cannot get a product from an empty list')
    } else if (products.length >= 1) {
        if (foundId === undefined) { throw new Error('Cannot get a product that does not exist') }
    }

    return foundId
}

function updateProduct(id, name, price) {
    const foundId = products.find(p => p.id == id)

    if (products.length === 0) {
        throw new Error('Cannot update a product from an empty list')
    } else if (products.length >= 1) {
        if (foundId === undefined) { throw new Error('Cannot update a product that does not exist') }
        if (name && price) {
            foundId.name = name
            foundId.price = price
            return foundId
        } else if (name && !price) {
            foundId.name = name
            return foundId
        } else if (!name && price) {
            foundId.price = price
            return foundId
        }
    }
}


module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct }