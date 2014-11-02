var User = require('../models/user.js');

exports.authUser = function(req, res, next) {
    var path = req.originalUrl;
    if(req.session.user) {
      return next();
    } else {
      var cookie = req.signedCookies.user;
      if(!cookie) {
          console.log('no cookie');
          if(!needLogin(path))
            return next();
          return res.render('login', {title: '用户登录'});
      }
      var username = cookie.username;
      var password = cookie.password;
      User.get(username, function(user) {
        if(user.length > 0 && user[0].username == username && user[0].password == password) {
          req.session.user = {
            username: username
          };
          res.render('index', { title: '首页' });
        } else {
          res.render('login', { title: '用户登录' });
        }
      });
    }
}


/*tool function*/
var needLogin = function(path) {
    var noLoginPath = ['/','/login','/register']; //不需要登陆的地址

    for(var i =0; i< noLoginPath.length;i++)
    {
        var item = noLoginPath[i];
        if(path == item || (item + '/') == path){
            return false; //不需要登陆
        }
    }
    return true;
}