const {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct,
    id,
} = require("./product");

beforeEach(() => {
    resetProducts();
});

describe("addProduct tests", () => {
    it("testing add product", () => {
        //debería añadir un producto
        // expect(addProduct("peras",12)).toBe("Producto añadido")
        // expect(addProduct("peras", 12)).toBe({ id: 0, name: "peras", price: 12 });
        expect(addProduct("peras", 12)).toEqual({
            id: 0,
            name: "peras",
            price: 12,
        });
        // expect(addProduct("peras", 12)).toMatchObject({
        //     id: 0,
        //     name: "peras",
        //     price: 12,
        // });
    });
    it("debería incrementar el id en 1 cada vez que se añada un producto", () => {
        addProduct("botes", 1.2);
        let products = getProducts();
        const updatedId = products.find((product) => product.name == "botes");
        expect(products).toEqual([{ id: 0, name: "botes", price: 1.2 }]);
        expect(updatedId.id).toBe(0);
        expect(products.length).toBe(1);
    });
    it("debería lanzar un error si el nombre o el precio no están definidos.", () => {
        expect(() => addProduct()).toThrow("Nombre y precio no estan definidos");
        expect(() => addProduct("manzana")).toThrow(
            "Nombre y precio no estan definidos"
        );
        expect(() => addProduct(undefined, 10)).toThrow(
            "Nombre y precio no estan definidos"
        );
    });
    it("debería lanzar un error si el producto ya existe", () => {
        addProduct("manzana", 10);
        expect(() => addProduct("manzana", 10)).toThrow("El producto ya existe");
    });
});

describe("removeProduct", () => {
    it("debería eliminar un producto", () => {
        addProduct("manzana", 10);
        addProduct("botes", 1.2);
        expect(removeProduct(0)).toBe("Producto eliminado");
        addProduct("pera", 11);
        removeProduct(1);
        let products = getProducts();
        expect(products).toEqual([{ id: 2, name: "pera", price: 11 }]);
        expect(products.find((product) => product.id == 1)).toBeUndefined();
        // expect(getProduct(1)).toBeUndefined()
    });
    it("debería lanzar un error si el producto no existe.", () => {
        expect(() => removeProduct(1900)).toThrow("Este producto no existe");
    });
});

describe("getProduct", () => {
    it("debería devolver un producto por su id", () => {
        addProduct("manzana", 10);
        expect(getProduct(0)).toStrictEqual({ id: 0, name: "manzana", price: 10 });
    });
    it("debería lanzar un error si el producto no existe", () => {
        addProduct("manzana", 10);
        expect(() => getProduct(1000)).toThrow("Este producto no existe");
    });
});

describe("updateProduct", () => {
    it("debería actualizar un producto por su id", () => {
        addProduct("manzana", 10);
        updateProduct(0, "MANZANA", 20);
        expect(getProduct(0)).toEqual({ id: 0, name: "MANZANA", price: 20 });
    });
    it("debería lanzar un error si el producto no existe", () => {
        addProduct("manzana", 10);
        expect(() => getProduct(1000)).toThrow("Este producto no existe");
    });
});