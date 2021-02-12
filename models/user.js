const mongoose = require('mongoose');
let ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `${props.value} is invalid! Username should consist only of english letters and digits`
            }
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `Password consist only of english letters and digits`
            }
        }
    }
})

module.exports = mongoose.model('User', userSchema)