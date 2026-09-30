const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    publicationYear: {
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1, 'Publication year must be a valid year'],
        max: [new Date().getFullYear(), 'Publication year cannot be in the future']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    }
});

module.exports = mongoose.model('Book', bookSchema);