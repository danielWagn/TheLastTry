var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/sites/Programm.html', { title: 'Programm' });
});

module.exports = router;
