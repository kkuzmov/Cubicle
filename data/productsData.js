const fs = require('fs/promises');
const path = require('path');
const productsDb = require('../config/products.json');



module.exports = {
    getAll(){
        return productsDb;
    },
    getOne(id){
        return productsDb.find(x => x.id === id); 
    },
    create(product) {
        
    }
} 

// създаване на функциите, които productService използва
// ЧАСТ ОТ EXAM PACKAGE