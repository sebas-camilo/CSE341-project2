const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    birthYear: {
        type: Number,
        required: [true, 'Birth year is required'],
        min: [1, 'Birth year must be a valid year'],
        max: [new Date().getFullYear(), 'Birth year cannot be in the future']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    notableWork: {
        type: String,
        required: [true, 'Notable work is required'],
        trim: true
    },
    website: {
        type: String,
        required: [true, 'Website is required'],
        trim: true
    }
});

module.exports = mongoose.model('Author', authorSchema);