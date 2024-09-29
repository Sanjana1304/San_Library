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

//INPUT - book name + person name/userId + return date (BOOK IS RETURNED)
//OUTPUT - update the Transaction DB
transacRouter.put('/return', async (req, res) => {
    const { bookName, email } = req.body;

    try {
        // Find the book details
        const book = await bookSchemaModel.findOne({ bookName });
        if (!book) return res.status(404).json({ message: "Book not found" });

        const user = await userSchemaModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Find the transaction
        const transaction = await transactionSchemaModel.findOne({ bookId: book._id, email, status: "issued" });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        // Set returnDate to today's date
        const returnDate = new Date();

        // Calculate totalRent
        const timeDiff = returnDate.getTime() - transaction.issueDate.getTime();
        const days = timeDiff / (1000 * 3600 * 24);
        const totalRent = days * transaction.rentPerDay;

        transaction.returnDate = returnDate;
        transaction.totalRent = totalRent;
        transaction.status = "returned";

        await transaction.save();
        res.status(200).json({ message: `Book returned. User has to pay : ${totalRent}`, transaction });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while returning the book" });
    }
});



module.exports = transacRouter;