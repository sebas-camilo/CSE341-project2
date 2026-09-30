const express = require('express');

const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const githubCallbackUrl = 'http://localhost:3000/github/callback';

// Allows Express to read JSON from requests
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    next();
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'],
}));

// Register your routes
app.use('/', require('./routes'));

//Passport configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: githubCallbackUrl
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
    //});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

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

