var query=require("./mysqlpool.js");

var sql='select count(*) from gaoxin7';
 query(sql,function(err,rows){
   if (!err) {
     console.log(rows);
   }
 })

 //dev test
