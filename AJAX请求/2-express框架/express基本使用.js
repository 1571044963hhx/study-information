//1. 引入express
const express = require('express');
//设置允许跨域请求
const cors = require('cors');

//2. 创建应用对象
const app = express();
app.use(cors());

// 使用内置中间件解析 JSON 请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (req, res) => {
    // response.header("Access-Control-Allow-Origin","*");
    //设置请求头，防止乱码
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json({ message: '你好，世界！' });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // 继续下一个中间件或路由处理
});


//路由设置
app.get('/home', (req, res) => {
    res.send('HELLO EXPRESS')
})

//post请求
app.post('/login', (req, res) => {
    const result = req.body; // 从请求体中获取数据
    res.header("Access-Control-Allow-Origin", "*");
    //设置请求头，防止乱码
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send({ message: '登录成功', result });
})


// //路由器是一个中间件，用于将具有共同路径前缀的相关路由组合在一起。它可以看作是一个独立的模块，负责处理特定的URL路径。
// const router = express.Router()


//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});


// 此外，还可通过服务端实现代理请求转发

// 以express框架为例

// var express = require('express');
// const proxy = require('http-proxy-middleware')
// const app = express()
// app.use(express.static(__dirname + '/'))
// app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
//                       }));
// module.exports = app

//使用proxy进行跨域（服务器端），还可以在vue端也可以实现