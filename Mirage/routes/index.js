var express = require('express');
var crypto = require('crypto');
var User = require('../models/user.js');
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
  var md5 = crypto.createHash('md5');
  var password = md5.update(body.password).digest('base64');
  User.get(body.username, function(user) {
      if(user.length > 0 && user[0].username == body.username && user[0].password == password) {
        req.session.user = {
          username: body.username
        };
        if(body.remAutoLogin != undefined) {
          res.cookie('user', { username: body.username, password: password }, { signed: true, maxAge: 5*60*1000, httpOnly: true });
        }
        res.render('index', {title: '首页'});
      } else {
        res.render('login', {title: '用户登录'});
      }
  });
});

/*注册处理*/
router.get('/register', function(req, res) {
  res.render('register',{title: '注册'});
});
router.post('/register', function(req, res) {
  var body = req.body;
  if(body.password !== body.confirmPass) {
    console.log('前后密码不一致');
    return res.redirect('/register');
  }

  var md5 = crypto.createHash('md5');
  var pass = md5.update(body.password).digest('base64');

  var newUser = new User({
    username: body.username,
    password: pass
  });

  User.get(newUser.username, function(user) {
    if(user.length > 0) {
      console.log('存在该用户');
      return res.render('register', {title: '注册'});
    }
    newUser.save(function(result){
      console.log(result);
      if(result != -1)
        res.render('index', {title: '首页'});
    });
  });
});

/*登入状态检查*/
function checkLogin(req, res) {
  if(req.session.user) {
    res.render('index', {title: '首页'});
  } else {
    res.render('login', {title: '登入'});
  }
}

module.exports = router;
