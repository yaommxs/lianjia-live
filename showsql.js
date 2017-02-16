var query=require("./mysqlpool.js");

var sql1='select * from lianjialist'
var sql2='delete from lianjialist'
var sql3='drop table lianjialist'

query(sql1,function(err,rows,fields){
  if (err) {
    console.log('读取失败');
    throw err;
  }
  console.log(rows.length);
  // console.log(rows);
});
