const fs = require('fs/promises');
const path = require('path');
const productsDb = require('../config/products.json');
const Model = require('./model');


class Cube extends Model{
    constructor(id, name, description, imageUrl, level){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }    
}
module.exports = Cube;