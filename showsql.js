var query=require("./mysqlpool.js");

var sql='select price,count(*) from lianjialist where price between 0 and 300 group by price';
 query(sql,function(err,rows){
   if (!err) {
     console.log(rows);
   }
 })
