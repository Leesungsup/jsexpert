//import http from 'http';
//import fs from 'fs';
//import express from 'express';
//import path from 'path';
//const __dirname = path.resolve();
var http = require('http'); // 서버 구동을 위한 node 내장 모듈 불러옴
var express = require('express');
var app = express();
var fs = require('fs'); //파일 읽기, 쓰기를 위한 node 내장 모듈 불러옴
var func = require('./src/naverAPI.js');
app.set('views', __dirname + '/views'); // views 폴더에서 ejs 템플릿을 가져오게 설정
app.set('view engine', 'ejs'); 
app.use('/src', express.static(__dirname + "/src"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
var server = http.createServer(app);
app.get('/', function(req, res){
    var context = [
        { 'a' : 'Hello', 'b' : 'World' },
        { 'a' : 'javacript', 'b' : 'is ...'},
        { 'a' : 'web', 'b' : 'is ...'}
    ]
    // data라는 이름으로 전달
    // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
    res.render('map.ejs', {'data' : context}, function(err ,html){
        if (err){
            console.log(err)
        }
        res.end(html) // 응답 종료
    })
});
/*app.get('/', function (req, res) {
    var slat = 37.3595704;
    var slong = 127.105399;
    var elat = 37.2762087;
    var elong = 127.0808982;
    var context=func.helloworld(slong, slat, elong, elat).pathdata;
    fs.readFile('./views/map.ejs', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.render(data);
    });
});*/
server.listen(3003, function () {
    console.log("Server Running.")
});