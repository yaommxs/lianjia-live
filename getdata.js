var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');
var mysql = require('mysql');
var mysqlconfig=require("./mysqlconfig");
var getpage=require("./getpage");

var baseurl='http://cd.lianjia.com/ershoufang/chenghua/pg';
getpage('longquanyi',function(totalpage){
  var urlArray=[];
  for (var i = 1; i <= totalpage; i++) {
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
          var houseinfo=$('.houseInfo');
          var alikes=$('.followInfo');
          var unitPrice=$('.unitPrice');
          money.map(function(index){
            var price_=$(this).text();
            var ahouseinfo_=houseinfo.eq(index).text();
            var unit_price_=unitPrice.eq(index).text();
            var unitprice_=unit_price_.replace(/[^0-9]/g,"");
            var houseinfoarr=ahouseinfo_.split(' | ');
            var title_=houseinfoarr[0];
            var room_count_=houseinfoarr[1];
            var square_=houseinfoarr[2].replace(/平米/g,"");
            var direction_=houseinfoarr[3];
            var alink_=aolink.eq(index).attr('href');
            var likes_=alikes.eq(index).text();
            var likearr=likes_.split('/');
            var follow_=likearr[0].replace(/[^0-9]/ig,"");
            var see_=likearr[1].replace(/[^0-9]/ig,"");
            var time_=likearr[2].replace(/发布/g,"");

            perPriceArray.push({
              price:price_,
              unitprice:unitprice_,
              title:title_,
              alink:alink_,
              square:square_,
              roomcount:room_count_,
              direction:direction_,
              follow:follow_,
              see:see_,
              time:time_,
            });
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
      }
      console.log(mysqlconfig);
      var connection = mysql.createConnection(mysqlconfig);
      connection.connect();

      connection.query('delete from lianjialist', function(errdel) {
        if (errdel) {
          console.log('删除失败');
          throw errdel;
        }
        else {
          console.log('删除成功');
        }
      })
      console.log('开始插入');

      for (var i = 0; i < allHouse.length; i++) {
        var perhouse=allHouse[i];
        connection.query('insert into lianjialist set ?', perhouse,function (errinsert, res) {

          if (errinsert) {
            console.log('插入失败');
            throw errinsert;
          }
        })
      }
      connection.connect();
      // for (var i = 0; i < allHouse.length; i++) {
      //   var perHouse=allHouse[i];
      //   connection.query('insert into lianjialist set ?', perHouse, function(errinsert, result) {
      //     if (err) throw err;
      //   });
      // }



      console.log('共抓取到'+allHouse.length+'条房屋信息')
  })


})
