
var express = require('express'),
    router = express.Router();

router.use('/admins', require('./admins'));
router.use('/orders', require('./orders'));
router.use('/contacts', require('./contacts'));

router.get('/', function (req, res) {
    res.render('index', {title: 'Boilerplate'});
});

router.get('*', function (req, res) {
    res.status(404).render('error', {
        title: 'Boilerplate', error: {
            status: 404,
            stack: 'Not found'
        }
    });
});

module.exports = router;
