const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('authors').find();
    result.toArray().then((authors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(authors);
    });
};

const getAuthorById = async (req, res) => {
    const authorId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('authors').find({ _id: authorId });
    result.toArray().then((authors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(authors[0]);
    });
};

const createAuthor = async (req, res) => {
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality,
        genre: req.body.genre,
        notableWork: req.body.notableWork,
        website: req.body.website
    };
    const response = await mongodb.getDatabase().db().collection('authors').insertOne(req.body);
    if (response.acknowledged) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the author.');
    }
};

const updateAuthor = async (req, res) => {
    const authorId = new objectId(req.params.id);
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality,
        genre: req.body.genre,
        notableWork: req.body.notableWork,
        website: req.body.website
    };
    const response = await mongodb.getDatabase().db().collection('authors').replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
};

const deleteAuthor = async (req, res) => {
    const userId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('authors').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the author.');
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};