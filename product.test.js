const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => { resetProducts() });

// 1. addProduct
describe('addProduct', () => {
    it('Should throw an error if one or both parameters (name, price) are not defined', () => {
        expect(() => addProduct().toThrow('Name and price of the product must be provided'));
        expect(() => addProduct('', 0.45).toThrow('Name of the product must be provided'));
        expect(() => addProduct('manzana', '').toThrow('Price of the product must be provided'));
    })
    it('Should throw an error if the product already exists in products array', () => {
        let products = [{ id: 1, name: 'manzana', price: 0.45 }]
        expect(() => addProduct('manzana', 0.45).toThrow('This item already exists'))
    })
    it('Should add a new product to products array', () => {
        const product = addProduct('manzana', 0.45).find(p => p.name === 'manzana' && p.price === 0.45)
        expect(product.name).toContain('manzana');
        expect(product.price).toBe(0.45)
    })
    it('Should increment id by 1 when a new product is added', () => {
        addProduct('manzana', 0.45)
        const updatedId = addProduct('naranja', 0.2).find(p => p.name === 'naranja' && p.price === 0.2)
        expect(updatedId.id).toBe(1)
    })
})

// 2. removeProduct
describe('removeProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => removeProduct(5).toThrow('Cannot remove a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => removeProduct(5).toThrow('Cannot remove a product that does not exist'))
    })
    it('Should remove a product with matching id', () => {
        let products = getProducts()
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        removeProduct(1)
        expect(products.find(p => p.id === 1)).toBeUndefined()
    })
})

// 3. getProduct
describe('getProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => getProduct(5).toThrow('Cannot get a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => getProduct(5).toThrow('Cannot get a product that does not exist'))
    })
    it('Should get a product with matching id', () => {
        let products = getProducts()
        addProduct('sandía', 0.96)
        addProduct('melón', 0.89)
        
        //expect(getProduct(1))
    })
})

// 4. updateProduct
describe('updateProduct', () => {
    it('Should throw an error if products array is empty', () => {
        let products = getProducts()
        expect(() => updateProduct(5).toThrow('Cannot update a product from an empty list'))
    })
    it('Should throw an error if the product does not exist', () => {
        let products = getProducts()
        expect(() => updateProduct(5).toThrow('Cannot update a product that does not exist'))
    })
})