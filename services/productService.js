const uniqid = require('uniqid');
const Cube = require('../models/cube');
const productsData = require('../config/products.json')
const fs = require('fs');
const path = require('path');

function getAll(){
    return productsData;
}
function getOne(id){
    return productsData.find(x => x.id === id);
}
 
function createCube(data){
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
        );
    
    productsData.push(cube);

    fs.writeFile(path.join(__dirname + '/../config/products.json'), JSON.stringify(productsData), (err)=>{
        if(err){
            console.log(err);
            return;
        }
    })
}
module.exports = {
    getAll,
    getOne,
    createCube
}