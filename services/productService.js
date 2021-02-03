// const uniqid = require('uniqid'); // библиотека за генериране на уникално ID, няма да е част от exam package, защото mongo генерира свои id
const Cube = require('../models/cube'); // модел за клас Cube - отпада от exam package заради mongo schema
// const productData = require('../data/productsData'); // взимаш фукнциите, създадени в product data


async function getAll(query){
    // let products = productData.getAll()
    // let products = Cube.getAll();
    let products = await Cube.find({}).lean();
    if(query.search){
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }
    if(query.from){
        products = products.filter(x => Number(x.level) >= query.from);
    }
    if(query.to){
        products = products.filter(x => Number(x.level) <= query.to);
    }
    return products;
}
async function getOne(id){
    return Cube.findById(id).lean();
}
 
function createCube(data){
    let cube = new Cube(data);

//    return productData.create(cube);
        return cube.save()
}
module.exports = {
    getAll,
    getOne,
    createCube
}