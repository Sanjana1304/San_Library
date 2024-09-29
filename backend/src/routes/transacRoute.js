const express = require("express");
const transactionSchemaModel = require("../schema/transactionSchemaCode");
const bookSchemaModel = require("../schema/bookSchemacode");
const userSchemaModel = require("../schema/userSchemaCode");

const transacRouter = express.Router();

//INPUT - book name + person name/userId + issue date (BOOK IS ISSUED)
//OUTPUT - update the Transaction DB with these values
transacRouter.post('/issue', async (req, res) => {
    const { bookName, email } = req.body;

    try {
        // Find the book details
        const book = await bookSchemaModel.findOne({ bookName });
        if (!book) return res.status(404).json({ message: "Book not found" });

        const user = await userSchemaModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Set issueDate to today's date
        const issueDate = new Date();

        const newTransaction = new transactionSchemaModel({
            bookId: book._id,
            bookName: book.bookName,
            email,
            userName: user.name,
            issueDate,
            returnDate: null,
            rentPerDay: book.rentPerDay,
            totalRent: 0,
            status: "issued"
        });

        await newTransaction.save();
        res.status(201).json({ message: "Transaction created. Book issued", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while issuing the book" });
    }
});

module.exports = transacRouter;