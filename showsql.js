var query=require("./mysqlpool.js");

// var sql1='select * from lianjialist'
// var sql2='delete from lianjialist'
// var sql3='drop table lianjialist'
//
// query(sql1,function(err,rows,fields){
//   if (err) {
//     console.log('读取失败');
//     throw err;
//   }
//   console.log(rows.length);
//   // console.log(rows);
// });

// var getSearchResult=function (table,word,callback){
  // var sql="select * from "+table+" where title like '%"+word+"%'";
  var sql="select * from lianjialist"
  console.log(sql);
  query(sql,function(err,rows){
    if (err) {
      console.log('搜索失败');
      var result={code:0,total:0,items:[]};
      // return;
      // callback(result);
      throw err;
    }
    for (var i = 0; i < rows.length; i++) {
      rows[i].top=offset+i+1;
    }
    console.log(rows.length);
    var result={code:1,total:rows.length,items:rows};
    // callback(result);
  });
// }
//
// getSearchResult('lianjialist','首创',function(result){
//   console.log(result.length);
// })
