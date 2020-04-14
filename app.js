var express=require('./node_modules/express');
var app = express();
var fs = require('fs')
var mysql  = require('mysql');  //导入mysql包
  
var connection = mysql.createConnection({     
  host     : 'localhost',    
  user     : 'me',             
  password : 'secret',      
  // port: '3306',                  
  database: 'my_db'
});
// 执行数据库连接 

connection.connect(function(err){
	if(err){
		console.log("链接失败");
		throw(err)
	}else{
		console.log("链接成功");
		connection.query("CREATE TABLE person(id int,user varchar(255),password varchar(255))", function(err,result){
			if(err){throw err}else{
				console.log("创建表成功")
			}
		})
	}
})
var sqlstring = "";
// 创建表
sqlstring = "Create Table MYTABLE (name VARCHAR(20), sex CHAR(1))"
connection.query(sqlstring, function (err, results, fields) {
    if (err) {
         console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------CREATE----------------------------');       
    console.log('CREATE TABLE:', results);        
    console.log('------------------------------------------------------------\n\n');  
});
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
app.use(express.static('/var/www/html'));
console.log(__dirname)

var questions=[
	{
	data:213,
	num:444,
	age:12
	},
	{
    data:456,
    num:678,
    age:25
    }
];
    //写个接口123
    app.get('/data',function(req,res){
	    res.status(200),
	    res.json(questions)
    });
    //写个接口123
    app.get('/text',function(req,res){
    	fs.readFile("./text.txt","utf-8",(err,data)=>{
			if(err){
				console.log("读取失败，错误为：",err);
				return 
			}
			console.log("读取成功，数据为：",data);
			var fileData = {
				code: 0,
				status: 'success',
				data: data
			}
			res.status(200),
	    	res.json(fileData)
		});	 
    });

    //配置服务端口
    var server = app.listen(3000, function () {

	    var host = server.address().address;

	    var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    })
