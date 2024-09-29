const express = require("express");
const bookSchemaModel = require("../schema/bookSchemacode");

const bookRouter = express.Router();

//to list all the books with that name or term in the book name from the database
bookRouter.get('/term',async(req,res) => {
    //code here
    const searchTerm = req.query.term;
    try {
        const books = await bookSchemaModel.find({
            bookName: { $regex: searchTerm, $options: 'i' }
        });
        
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ message: "No books found with the given term." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while searching for books." });
    }
});

//list of books with rent in that range
bookRouter.get('/rent',async(req,res) => {
    //code here
    const minRent = req.query.min;
    const maxRent = req.query.max;
    try {
        const books = await bookSchemaModel.find({
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ message: "No books found with the given rent range." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while searching for books." });
    }
});

//INPUT - category + name/term + rent per day(range)
//OUTPUT - list of books with matching values as in input
bookRouter.get('/',async(req,res) => {
    //code here
    const category = req.query.category;
    const searchTerm = req.query.term;
    const minRent = req.query.min;
    const maxRent = req.query.max;
    try {
        const books = await bookSchemaModel.find({
            category: category,
            bookName: { $regex: searchTerm, $options: 'i' },
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).json({ message: "No books found with the given input." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while searching for books." });
    }
});


module.exports = bookRouter;