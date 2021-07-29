//import { helloworld } from "./naverAPI.js";
console.log(slong,slat,elong,elat);
var func = require('./naverAPI.js'); // 같은 디렉토리에 있다고 가정
//var slat = 37.3595704;
//var slong = 127.105399;
//var elat = 37.2762087;
//var elong = 127.0808982;
console.log(func.helloworld(slong,slat,elong,elat));
//console.log(func.ho());
//requirejs("naverAPI");