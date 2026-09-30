const router = require('express').Router();
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ message: 'You do not have access.' });
    }
    next();
};

router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
});

router.use('/authors', isAuthenticated, require('./authors'));
router.use('/books', isAuthenticated, require('./books'));
router.use('/api-docs', require('./swagger'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;