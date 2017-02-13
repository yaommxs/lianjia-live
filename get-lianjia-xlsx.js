var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var async=require('async');
var xlsx=require('node-xlsx');

var baseurl='http://cd.lianjia.com/ershoufang/gaoxin7/pg'
var urlArray=[];
for (var i = 1; i <= 75; i++) {
  var url=baseurl+i;
  urlArray.push(url);
}

async.map(urlArray,function(url,callback){
  var perPriceArray=[];
  request(url,function(error,response,body){
      if (!error&&response.statusCode==200) {
        var $=cheerio.load(body);
        var money=$(".totalPrice span");
        var alink=$('.info .title a');
        var afollow=$('.followInfo');
        money.map(function(index){
          var price=$(this).text();
          var ahref=alink.eq(index).attr('href');
          var follow=afollow.eq(index).text();
          var perRow=[];
          perRow.push(price,ahref,follow);
          perPriceArray.push(perRow);
        })
      }
  callback(null, perPriceArray);
  })
},function(err,results){
    var sheet1=[['价格（万）','链接', '关注']];
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < results[i].length; j++) {
        sheet1.push(results[i][j]);
      }
    }
    var buffer = xlsx.build([{name: "链家成都高新区二手房信息表", data: sheet1}]);
    fs.writeFile('./data/链家成都高新区二手房信息表.xlsx',buffer);
    console.log('共抓取到'+sheet1.length+'条房屋信息');
})
