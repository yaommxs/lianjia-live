var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
var mysql = require('mysql');

var baseurl='http://cd.lianjia.com/ershoufang/gaoxin7/pg';
var urlArray=[];
for (var i = 1; i <= 10; i++) {
  var url=baseurl+i+'co32/';
  urlArray.push(url);
}

async.map(urlArray,function(url,callback){
  var perPriceArray=[];
  request(url,function(error,response,body){
      if (!error&&response.statusCode==200) {
        var $=cheerio.load(body);
        var money=$(".totalPrice span");
        var aolink=$('.info .title a');
        var alikes=$('.followInfo');
        money.map(function(index){
          var price_=$(this).text();
          var alink_=aolink.eq(index).attr('href');
          var likes_=alikes.eq(index).text();
          perPriceArray.push({price:price_,alink:alink_,likes:likes_});
        })
      }
  callback(null, perPriceArray);
  })
},function(err,results){
    var allHouse=[];
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < results[i].length; j++) {
        allHouse.push(results[i][j]);
      }
    };
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'xxx',
      database : 'lianjia'
    });

    connection.connect();

    for (var i = 0; i < allHouse.length; i++) {
      var perHouse=allHouse[i];
      connection.query('insert into lianjialist set ?', perHouse, function(err, result) {
        if (err) throw err;
      });
    }

    connection.query('select * from lianjialist limit 5', function(err, rows, fields) {
      if (err) throw err;
      console.log('前五条：');
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);
      }
    });
    connection.end();

    console.log('共抓取到'+allHouse.length+'条房屋信息');
})
