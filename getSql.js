var getSql=function(table,limit,offset,sqlCol,orderby){
  var basesql='select * from '+table;


  if (orderby=='time') {
    basesql+=' limit '+limit+' offset '+offset;
  } else {
    basesql+=' order by '+sqlCol+' '+orderby+' limit '+limit+' offset '+offset;
  }
  console.log(basesql);
}

// var getTableSql=function(table){
//   switch (table) {
//     case lianjiagaoxin:
//
//       break;
//     case lianjiashuangliu:
//
//       break;
//     default:
//
//   }
// }

getSql('lianjialist',20,0,'price','desc');
