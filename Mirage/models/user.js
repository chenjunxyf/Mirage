var client = require('../utils/db.js').init();

/**
* user model
*/
var User = function(user) {
  this.username = user.username;
  this.password = user.password;
}

User.get = function get(username, callback) {
  var sql = 'SELECT * FROM user WHERE username=?';
  client.select(sql, [username], function(err, result) {
    if(err) {
      console.log('select user failed.');
      callback([]);
      return;
    }
    callback(result);
  });
}


/*export*/
module.exports = User;