let products = []; // declaramos una variable products vacía
let id = 0; // declaramos una variable id con valor 0

function resetProducts() {
    products = [];
    id = 0;
}

function getProducts() {
    if (products.length == 0) {
        throw new Error("No hay productos");
    }
    return products;
}

function addProduct(name, price) {
    const found = products.some((product) => product.name == name); // guarda booleano
    // const found = products.find(product => product.name == name)// guarda producto
    if (!name || !price) {
        throw new Error("Nombre y precio no estan definidos");
    }
    if (found) {
        throw new Error("El producto ya existe");
    }
    const product = { id, name, price };
    id++;
    products.push(product);
    return product;
}

function findProductById(id) {
    const found = products.find((product) => product.id == id);
    if (!found) {
        throw new Error("Este producto no existe");
    }
    return found;
}

function removeProduct(id) {
    findProductById(id);
    products = products.filter((product) => product.id !== id);
    return "Producto eliminado";
}

function getProduct(id) {
    if (products.length == 0) {
        throw new Error("No hay productos");
    }
    //opciion 1
    // const found = findProductById(id)
    // const found = products.find((product) => product.id == id);
    //opcion 2
    const idFound = products.findIndex((product) => product.id == id);
    if (idFound == -1) {
        throw new Error("Este producto no existe");
    }
    //   if (found) {
    //     throw new Error("Este producto no existe");
    // }
    return products[idFound];
    // return found;
}

function updateProduct(id, name, price) {
    const found = findProductById(id);
    if (!name && !price) {
        throw new Error("Nombre y precio no estan definidos");
    }
    if (name) {
        found.name = name;
    }
    if (price) {
        found.price = price;
    }
    return found
}

module.exports = {
    id,
    resetProducts,
    getProducts,
    getProduct,
    addProduct,
    removeProduct,
    updateProduct,
};