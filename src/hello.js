console.log(slong,slat,elong,elat);
var requirejs = require("requirejs");
const func = require('./naverAPI.js'); // 같은 디렉토리에 있다고 가정
console.log(func.helloworld(slong,slat,elong,elat));
//requirejs("naverAPI");