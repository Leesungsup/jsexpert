var express=require('express');
var app=express();
app.use(express.static('public'))
app.get('/',function(req,res){
  res.send('Hello home page');
});
app.get('/route',function(req,res){
  res.send('Hello Router, <img src="/mingraph.png"')
});
app.get('/dynamic',function(req,res){
  var lis='';
  var time=Date()
  for(var i=0;i<5;i++){
    lis=lis+'<li>coding</li>';
  }
  var output="<!DOCTYPE html><html lang='en' dir='ltr'><head><meta charset='utf-8'><title></title></head><body><h1>Hello, Stagcjgic!</h1><ul>${lis}</ul>${time}</body></html>";
  res.send(output);
});
app.get('/login',function(req,res){
  res.send('Login Please');
});
app.listen(3000,function(){
  console.log('Conneted 3000 port!')
});
