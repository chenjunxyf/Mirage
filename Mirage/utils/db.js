var mysql = require('mysql');
var conf = require('../conf/setting.json');

var client = {};
var pool = null;

/**
* 初始化连接池
*/
client.init = function() {
  if(!pool) {
    pool = mysql.createPool(conf.mysql);
  }
  return client;
}

/**
* 执行sql语句
* @param sql {String} sql语句
* @param args {Object} sql执行参数
* @param callback {function} 回调
*/
client.query = function(sql, args, callback) {
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log('connection error : ' + err);
      return;
    }
    var query = connection.query(sql, args, function(err, result) {
      connection.release();
      callback.apply(null, [err, result]);
    });
  });
}

/**
* 工具函数
*/
client.select = client.query;
client.update = client.query;
client.insert = client.query;
client.delete = client.query;

/**
* 关闭连接池
*/
client.shutdown = function() {
  if(pool) {
    pool.end();
  }
}

/**
* 参数检测，防注入
*/
client.escape = mysql.escape;
client.escapeId = mysql.escapeId;


/*export*/
module.exports = client;