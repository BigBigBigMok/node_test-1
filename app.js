var express=require('./node_modules/express');
var app = express();
var fs = require('fs')
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
