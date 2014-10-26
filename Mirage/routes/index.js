var express = require('express');
var user = require('../models/user.js');
var router = express.Router();


/* GET login page. */
router.get('/', checkLogin);

/*GET home page*/
router.get('/index', function(req, res) {
  res.render('index', {title: '首页'});
});

/*登入处理*/
router.get('/login', checkLogin);
router.post('/login', function(req, res) {
  var body = req.body;
  user.get(body.username, function(user) {
    if(user.length > 0) {
      console.log(user[0]);
      req.session.user = user[0];
      res.render('index', {title: '首页'});
    } else {
      res.render('login', {title: '用户登入'});
    }
  });
});

/*登入状态检查*/
function checkLogin(req, res) {
  if(req.session.user) {
    res.render('index', {title: '首页'});
  } else {
    res.render('login');
  }
}
module.exports = router;
