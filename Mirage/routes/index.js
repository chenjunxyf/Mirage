var express = require('express');
var user = require('../models/user.js');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res) {
  res.render('login', { title: '用户登入' });
});


/*handle login*/
router.get('/login', function(req, res) {
  res.render('login', { title: '用户登入' });
});
router.post('/login', function(req, res) {
  var body = req.body;
  user.get(body.username, function(user) {
    if(user.length > 0) {
      console.log(user[0]);
      res.render('index', {title: '首页'});
    } else {
      res.render('login', {title: '用户登入'});
    }
  });
});
module.exports = router;
