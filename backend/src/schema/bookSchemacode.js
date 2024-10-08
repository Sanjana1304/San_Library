const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
});

const bookSchemaModel = mongoose.model("books", bookSchema);

module.exports = bookSchemaModel;
