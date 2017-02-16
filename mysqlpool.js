var mysql=require("mysql");
var mysqlconfig=require("./mysqlconfig");

var pool = mysql.createPool(mysqlconfig);

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(err,rows,fields){
                //释放
                conn.release();
                //事件驱动回调
                callback(err,rows,fields);
            });
        }
    });
};

module.exports=query;
