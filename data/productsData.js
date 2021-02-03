const fs = require('fs/promises');
const path = require('path');
const productsDb = require('../config/products.json');

// създаване на функциите, които productService използва
// ЧАСТ ОТ EXAM PACKAGE

module.exports = {
    getAll(){
        return productsDb;
    },
    getOne(id){
        return productsDb.find(x => x.id === id); 
    }
} 

