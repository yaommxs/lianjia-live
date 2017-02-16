var request = require('request');
var cheerio = require('cheerio');

var basepageurl='http://cd.lianjia.com/ershoufang/';

var getPage=function(area,callback){
  var getpageurl=basepageurl+area+'/co32/';
  request(getpageurl,function(error,response,body){
    if (!error&&response.statusCode==200) {
      var $=cheerio.load(body);
      var pagebox=$(".house-lst-page-box");
      var pageobj=JSON.parse(pagebox.attr('page-data'));
      var totalpage=pageobj.totalPage
      callback(totalpage)
    }
  });
}

module.exports = getPage;
