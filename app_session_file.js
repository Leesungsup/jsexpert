var express=require('express');
var session=require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser=require('body-parser');
var app=express();
var md5=require('md5');
app.use(session({
  secret:'asfgagaagad123',
  resave:false,
  saveUninitialized:true,
  store:new MySQLStore({
    host : 'localhost',
    port : 8080,
    user : 'root',
    password : 'kosj0530',
    database : 'o2'
  })
}));
app.use(bodyParser.urlencoded({extended:false}));
app.get('/count',function(req,res){
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count=1;
  }
  res.send('count:'+req.session.count);
});
app.get('/auth/logout',function(req,res){
  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('\welcome');
  });
});
app.get('/welcome',function(req,res){
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
      `);
  }else{
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `);
  }
});
var salt="3r1ounonowagn";
var pwd="111";
var pass=md5(pwd+salt);
app.post('/auth/login',function(req,res){
  var user={
    username:'egoing',
    password: pass,
    displayName:'Egoing'
  };
  var uname=req.body.username;
  var pwd=req.body.password;
  if(uname===user.username && md5(pwd+salt)===user.password){
    req.session.displayName=user.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    });
  }else{
    res.send('Who are you<a href="/auth/login">login</a>');
  }
});
app.get('/auth/login',function(req,res){
  var output=`
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>`;
  res.send(output);
});
app.listen(3003,function(){
  console.log('Connected 3003 port!!!');
});
