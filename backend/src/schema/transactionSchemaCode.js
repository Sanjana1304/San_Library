const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    bookId:{
        type: String,
        required: true,
    },
    bookName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    issueDate:{
        type: Date,
    },
    returnDate:{
        type: Date,
    },
    rentPerDay:{
        type: Number,
    },
    totalRent:{
        type: Number,
    },
    status:{
        type: String,
    }
    
})

const transactionSchemaModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionSchemaModel;
