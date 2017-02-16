var express = require('express');
var app = express();
var query=require("./mysqlpool.js");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

console.log('site on localhost:3000');
app.use(express.static('./public/build'));
app.use(express.static('./public/images'));

app.get('/',function(req,res){
  res.sendfile('./public/build/index.html');
})

app.post('/api/v1/itemlist',jsonParser,function (req, res) {
  var page_size=20;
  var page_num=parseInt(req.body.p);
  var post_order=req.body.orderby;
  var offset=(page_num-1)*page_size;

  if (page_num>=1) {
    var orderby=getOrder(post_order);
    getSqlResult(page_size,offset,'price',orderby,function(result){
      res.send(result);
    });
  }

});

app.listen(3000);

var getOrder=function (post_order){
  switch (post_order) {
    case 'up':
      return 'asc';
      break;
    case 'down':
      return 'desc';
      break;
    default:
      return 'time';
  }
}

var getSqlResult=function (limit,offset,sqlCol,orderby,callback){
  var sql='select * from lianjialist';
  if (orderby=='time') {
    sql+=' limit '+limit+' offset '+offset;
  } else {
    sql+=' order by '+sqlCol+' '+orderby+' limit '+limit+' offset '+offset;
  }
  console.log(sql);
  query(sql,function(err,rows,fields){
    if (err) {
      console.log('读取失败');
      var result={code:0,total:0,items:[]};
      callback(result);
      throw err;
    }
    var sql_total=fields[fields.length-1].length;
    var result={code:1,total:sql_total,items:rows};
    callback(result);
  });
}
