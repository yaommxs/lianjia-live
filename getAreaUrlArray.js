var request = require('request');
var cheerio = require('cheerio');

var baseurl='http://cd.lianjia.com/ershoufang/';

var getAreaUrlArray=function(area,callback){
  var getpageurl=baseurl+area+'/co32/';
  request(getpageurl,function(error,response,body){
    if (!error&&response.statusCode==200) {
      var $=cheerio.load(body);
      var pagebox=$(".house-lst-page-box");
      var pageobj=JSON.parse(pagebox.attr('page-data'));
      var totalpage=pageobj.totalPage;
      var urlArray=[];
      for (var i = 1; i <= totalpage; i++) {
        var url=baseurl+area+'/pg'+i+'/co32/';
        urlArray.push(url);
      }
      callback(urlArray)
    }
  });
}

module.exports = getAreaUrlArray;
