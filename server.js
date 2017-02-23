var express = require('express');
var app = express();
var query=require("./mysqlpool.js");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var async = require('async');

console.log('site on localhost:3000');
app.use(express.static('./public/build'));
app.use(express.static('./public/images'));

app.get('/',function(req,res){
  res.sendfile('./public/build/index.html');
})

app.get('/api/v1/chart/priceall',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getPriceAllFreResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})

app.get('/api/v1/chart/price',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getPriceResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})

app.get('/api/v1/chart/unitprice',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getUnitPriceResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})

app.get('/api/v1/chart/direction',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getDirectionResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})

app.get('/api/v1/chart/roomcount',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getRoomCountResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})

app.get('/api/v1/chart/follow',function(req,res){
  var menukey=parseInt(req.query.menukey);
  if (menukey<12) {
    var table=menuKeyParseTable(menukey);
    getFollowResult(table,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
})


app.post('/api/v1/itemlist',jsonParser,function (req, res) {
  var page_size=20;
  var page_num=parseInt(req.body.p);
  var post_orderitem=req.body.orderitem;
  var post_orderby=req.body.orderby;
  var post_menukey=parseInt(req.body.menukey);
  var offset=(page_num-1)*page_size;

  if ((page_num>=1)&&(post_menukey<12)) {
    var orderby=getOrderBy(post_orderby);
    var table=menuKeyParseTable(post_menukey);
    getSqlResult(table,page_size,offset,post_orderitem,orderby,function(result){
      res.send(result);
    });
  }else {
    res.send(null);
  }
});

app.post('/api/v1/search',jsonParser,function (req, res) {
  var word=req.body.word;
  var post_menukey=parseInt(req.body.menukey);
  if (post_menukey<12) {
    var table=menuKeyParseTable(post_menukey);
    getSearchResult(table,word,function(result){
      res.send(result);
    })
  }else {
    res.send(null);
  }
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
  query(sql,function(err,rows){
    if (err) {
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

var getPriceAllFreResult=function(table,frecb){
  var sqlarr=[];
  for (var i = 0; i < 30; i++) {
    var sql='select count(*) from '+table+' where price between '+i*10+' and '+(i+1)*10;
    sqlarr.push({price:(i+1)*10,sql:sql});
  }
  async.map(sqlarr,(item,callback)=>{
    query(item.sql,(err,rows)=>{
      if (!err) {
        callback(null,{price:item.price,f:rows[0]["count(*)"]});
      }
    })
  },(err,result)=>{
    var pricetotalfre=0;
    for (var i = 0; i < result.length; i++) {
      pricetotalfre+=result[i].f;
    }
    for (var i = 0; i < result.length; i++) {
      var pricefre=(result[i].f)/pricetotalfre;
      pricefre=pricefre*100;
      result[i].f=pricefre.toFixed(2);
    }
    frecb(result);
  })
}

var getPriceResult =function(table,callback){
  var sql="select time,price from "+table;
  query(sql,function(err,rows){
    if (err) {
      callback(null);
      throw err;
    }
    rows.reverse();
    callback(rows);
  });
}

var getUnitPriceResult =function(table,callback){
  var sql="select time,unitprice from "+table+" limit 200 offset 0";
  query(sql,function(err,rows){
    if (err) {
      callback(null);
      throw err;
    }
    rows.reverse();
    callback(rows);
  });
}

var getArrFrequency=function (array,name='name',value='value'){

  var tempobj={}, resarr=[];
  for (var i = 0; i < array.length; i++) {
    if (tempobj[array[i]]) {
      tempobj[array[i]]++;
    }else {
      tempobj[array[i]]=1;
    }
  }
  for (i in tempobj){
    var perobj={};
    perobj[name]=i;
    perobj[value]=tempobj[i];
    if (i) resarr.push(perobj)
  }
  resarr.sort(function(a,b){
    return b[value]-a[value];
  })
  return resarr;
}

var getDirectionResult=function(table,callback){
  var sql="select direction from "+table;
  query(sql,function(err,rows){
    if (err) {
      callback(null);
      throw err;
    }
    var dirstr='';
    for (var i = 0; i < rows.length; i++) {
      dirstr+=rows[i].direction+' ';
    }
    var dirarr=dirstr.split(' ');
    var result=getArrFrequency(dirarr);
    callback(result.slice(0,8));
  });
}

var getRoomCountResult=function(table,callback){
  var sql="select roomcount from "+table;
  query(sql,function(err,rows){
    if (err) {
      callback(null);
      throw err;
    }
    var roomstr='';
    for (var i = 0; i < rows.length; i++) {
      roomstr+=rows[i].roomcount+'|';
    }
    var roomarr=roomstr.split('|');
    var result=getArrFrequency(roomarr);

    callback(result.slice(0,10));
  });
}

var getFollowResult =function(table,callback){
  var sql="select title,follow from "+table+" order by follow desc limit 10 offset 0";
  query(sql,function(err,rows){
    if (err) {
      callback(null);
      throw err;
    }
    rows.reverse();
    callback(rows);
  });
}

var menuKeyParseTable=function(menukey){
  var tableArray=['gaoxin7','qingyang','wuhou','jinjiang','chenghua','jinniu','tianfuxinqu','shuangliu','wenjiang','pidou','longquanyi','xindou'];
  return tableArray[menukey];
}
