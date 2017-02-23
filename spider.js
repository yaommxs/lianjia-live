var async = require('async');
var mysql = require('mysql');
var mysqlconfig=require("./mysqlconfig");
var pullareadata = require('./pullareadata')

// var areaArray=['gaoxin7','qingyang','wuhou','jinjiang','chenghua','jinniu','tianfuxinqu','shuangliu','wenjiang','pidou','longquanyi','xindou'];
// async.map(areaArray,function(area,callback){
//
// },function(){
//
// })
var area='gaoxin7';
pullareadata(area,function(result){
  console.log(area+'：'+result.length+'条数据');
  var connection = mysql.createConnection(mysqlconfig);
  connection.connect();
  connection.query('delete from '+area, function(err) {
    if (!err) {
      console.log('原表删除成功');
      console.log('正在储存新表至数据库...');
    }
  })
  for (var i = 0; i < result.length; i++) {
    var perhouse=result[i];
    connection.query('insert into '+area+' set ?', perhouse,function (err, rows) {
      if (err) {
        throw err;
      }
    })
  }
  connection.end(function(err){
    if (!err) {
      console.log('抓取完毕');
    }
  });

})
