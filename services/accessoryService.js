const Accessory = require('../models/accessory');

function create(data){
let accessory = new Accessory(data);

return accessory.save()
}


module.exports = {
    create
}