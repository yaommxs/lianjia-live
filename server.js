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
  var post_orderitem=req.body.orderitem;
  var post_orderby=req.body.orderby;
  var offset=(page_num-1)*page_size;

  if (page_num>=1) {
    var orderby=getOrderBy(post_orderby);
    getSqlResult('lianjialist',page_size,offset,post_orderitem,orderby,function(result){
      res.send(result);
    });
  }

});

app.post('/api/v1/search',jsonParser,function (req, res) {
  var word=req.body.word;
  getSearchResult('lianjialist',word,function(result){
    res.send(result);
  })
})

app.listen(3000);

var getOrderBy=function (post_orderby){
  switch (post_orderby) {
    case 'up':
      return 'asc';
      break;
    case 'down':
      return 'desc';
      break;
    default:
      return 'desc';
  }
}

var getSqlResult=function (table,limit,offset,sqlCol,orderby,callback){
  var sql='select * from '+table;

  if (sqlCol=='time') {
    sql+=' limit '+limit+' offset '+offset;
  } else {
    sql+=' order by '+sqlCol+' '+orderby+' limit '+limit+' offset '+offset;
  }
  console.log(sql);

  var getTotal=function(table,handleTotalCallback){
    query('select count(*) from '+table,function(err,rows){
      if (err) {
        throw err;
      }
      var total=rows[0]['count(*)'];
      handleTotalCallback(total);
    });
  }
  getTotal(table,function(total){
    query(sql,function(err,rows){
      if (err) {
        console.log('读取失败');
        var result={code:0,total:0,items:[]};
        callback(result);
        throw err;
      }
      for (var i = 0; i < rows.length; i++) {
        rows[i].top=offset+i+1;
      }
      var result={code:1,total:total,items:rows};

      callback(result);
    });
  })
}

var getSearchResult=function (table,word,callback){
  var sql="select * from "+table+" where title like '%"+word+"%'";
  console.log(sql);
  query(sql,function(err,rows){
    if (err) {
      console.log('搜索失败');
      var result={code:0,total:0,items:[]};
      callback(result);
      throw err;
    }
    for (var i = 0; i < rows.length; i++) {
      rows[i].top=i+1;
    }
    var result={code:1,total:rows.length,items:rows};
    callback(result);
  });
}
