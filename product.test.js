const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => { resetProducts() });

describe('1. addProduct', () => {
    it('Should throw an error if one or both parameters (name, price) are not defined', () => {
        expect(() => addProduct().toThrow('Name and price of the product must be provided'));
        expect(() => addProduct(undefined, 0.45).toThrow('Name of the product must be provided'));
        expect(() => addProduct('manzana', undefined).toThrow('Price of the product must be provided'));
    })
    it('Should throw an error if the product already exists in products array', () => {
        let products = [{ id: 1, name: 'manzana', price: 0.45 }]
        expect(() => addProduct('manzana', 0.45).toThrow('This item already exists'))
    })
    it('Should add a new product to products array', () => {
        const product = addProduct('manzana', 0.45).find(p => p.name === 'manzana' && p.price === 0.45)
        expect(product).toMatchObject({ name: 'manzana', price: 0.45 })
    })
    it('Should increment id by 1 when a new product is added', () => {
        let products = getProducts()
        addProduct('manzana', 0.45)
        addProduct('naranja', 0.2)
        const updatedId = products.find(p => p.name === 'naranja' && p.price === 0.2)
        expect(updatedId.id).toBe(1)
    })
})


describe('2. removeProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => removeProduct(5).toThrow('Cannot remove a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => removeProduct(5).toThrow('Cannot remove a product that does not exist'))
    })
    it('Should remove a product with matching id', () => {
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        expect(removeProduct(1).find(p => p.id === 1)).toBeUndefined()
    })
})


describe('3. getProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => getProduct(5).toThrow('Cannot get a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => getProduct(5).toThrow('Cannot get a product that does not exist'))
    })
    it('Should get a product with matching id', () => {
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        expect(getProduct(1)).toMatchObject({ id: 1, name: 'melón', price: 0.89 })
    })
})


describe('4. updateProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => updateProduct(3).toThrow('Cannot update a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => updateProduct(3).toThrow('Cannot update a product that does not exist'))
    })
    it('Should update the name and price of a product as specified in the parameters', () => {
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        addProduct('limón', 0.37)
        expect(updateProduct(2, 'plátano', 0.53)).toMatchObject({ id: 2, name: 'plátano', price: 0.53 })
    })
    it('Should update only the name', () => {
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        addProduct('limón', 0.37)
        expect(updateProduct(2, 'plátano')).toMatchObject({ id: 2, name: 'plátano', price: 0.37 })
    })
    it('Should update only the price', () => {
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        addProduct('limón', 0.37)
        expect(updateProduct(2, 'limón', 0.67)).toMatchObject({ id: 2, name: 'limón', price: 0.67 })
    })
})