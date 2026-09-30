const mongoose = require('mongoose');
const Author = require('../models/author');

//Get all authors
const getAllAuthors = async (req, res, next) => {
    //#swagger.tags = ['Authors']
    try {
        const authors = await Author.find();
        
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
};

//Get a author by ID
const getAuthorById = async (req, res, next) => {
    //#swagger.tags = ['Authors']
    try {
        const authorId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({ message: 'Invalid author ID' });
        }

        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

//Create a new author
const createAuthor = async (req, res, next) => {
    //#swagger.tags = ['Authors']
    try {
        const { firstName, lastName, birthYear, nationality, genre, notableWork, website } = req.body;

        const author = await Author.create({
            firstName,
            lastName,
            birthYear,
            nationality,
            genre,
            notableWork,
            website
        });

        res.status(201).json({
            message: 'Author created successfully',
            author
        });
    } catch (error) {
        next(error);
    }
};

//Update a author by ID
const updateAuthor = async (req, res, next) => {
    //#swagger.tags = ['Authors']
    try {
        const authorId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({ 
                message: 'Invalid author ID' 
            });
        }

        const { firstName, lastName, birthYear, nationality, genre, notableWork, website } = req.body;

        const updatedAuthor = await Author.findByIdAndUpdate(
            authorId,
            { 
                firstName,
                lastName,
                birthYear,
                nationality,
                genre,
                notableWork,
                website
            },
            { 
                new: true, 
                runValidators: true
             }
        );

        if (!updatedAuthor) {
            return res.status(404).json({ 
                message: 'Author not found' 
            });
        }

        res.status(200).json({
            message: 'Author updated successfully',
            author: updatedAuthor
        });
    } catch (error) {
        next(error);
    }
};

//Delete a author by ID
const deleteAuthor = async (req, res, next) => {
    //#swagger.tags = ['Authors']
    try {
        const authorId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({ message: 'Invalid author ID' });
        }

        const deletedAuthor = await Author.findByIdAndDelete(authorId);

        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({
            message: 'Author deleted successfully',
            author: deletedAuthor
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};