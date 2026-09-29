const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World!');
});

router.use('/authors', require('./authors'));

module.exports = router;