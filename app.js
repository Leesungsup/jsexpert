var http = require('http'); // 서버 구동을 위한 node 내장 모듈 불러옴
var fs = require('fs'); //파일 읽기, 쓰기를 위한 node 내장 모듈 불러옴

// 404 error message : 페이지 오류가 발생 하였을때
function send404Message(response){
  response.writeHead(404,{"Content-Type":"text/plain"}); //단순한 글자 출력
  response.write("404 에러...");
  response.end();
}

// 200 okay: 정상적인 요청일때

function onRequest(request,response){

  if (request.method == 'GET' && request.url == '/'){
    response.writeHead(200,{"Content-Type":"text/html"});//웹페이지 출력
    fs.createReadStream("./reacthtml.html").pipe(response); //html 웹페이지 respond
  }else{
    //html 파일이 존재하지 않을시에는 
    send404Message(response);
  }
}

http.createServer(onRequest).listen(3003); //포트번호 8888
console.log("Server Created!!");