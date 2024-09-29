const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
        required: true,
    },
})

const userSchemaModel = mongoose.model('users', userSchema);

module.exports = userSchemaModel;