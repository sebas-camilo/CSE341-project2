const router = require('express').Router();



router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World!');
});

router.use('/authors', require('./authors'));

router.use('/books', require('./books'));

router.use('/api-docs', require('./swagger'));

module.exports = router;