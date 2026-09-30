const express = require('express');

const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

// Allows Express to read JSON from requests
app.use(express.json());

// Register your routes
app.use('/', require('./routes'));

//Central error handling
app.use((error, req, res, next) => {
    console.error(error);

    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({ 
            message: 'Invalid data',
            error: error.message 
        });
    }

    res.status(500).json({
        message: 'An unexpected server error occurred',
    });
});

//Connect to MongoDB and start the server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database', err);
        process.exit(1);  
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`)
        });
    }
});

