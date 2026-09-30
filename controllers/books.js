const mongoose = require('mongoose');
const Book = require('../models/book');

//Get all books
const getAllBooks = async (req, res, next) => {
    //#swagger.tags = ['Books']
    try {
        const books = await Book.find();
        
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

//Get a book by ID
const getBookById = async (req, res, next) => {
    //#swagger.tags = ['Books']
    try {
        const bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

//Create a new book
const createBook = async (req, res, next) => {
    //#swagger.tags = ['Books']
    try {
        const { title, author, publicationYear, genre } = req.body;

        const book = await Book.create({
            title,
            author,
            publicationYear,
            genre
        });

        res.status(201).json({
            message: 'Book created successfully',
            book
        });
    } catch (error) {
        next(error);
    }
};
  
//Update a book by ID
const updateBook = async (req, res, next) => {
    //#swagger.tags = ['Books']
    try {
        const bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ 
                message: 'Invalid book ID' 
            });
        }

        const { title, author, publicationYear, genre } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { 
                title, 
                author, 
                publicationYear, 
                genre 
            },
            { 
                new: true, 
                runValidators: true
             }
        );

        if (!updatedBook) {
            return res.status(404).json({ 
                message: 'Book not found' 
            });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

//Delete a book by ID
const deleteBook = async (req, res, next) => {
    //#swagger.tags = ['Books']
    try {
        const bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};