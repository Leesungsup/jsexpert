var fs = require('fs');
const helloworld = function () {
    console.log("run");
    var headers = {
        'X-NCP-APIGW-API-KEY-ID': 'uzlzuhd2pa',
        'X-NCP-APIGW-API-KEY': 'INnDxBgwB6Tt20sjSdFEqi6smxIBUNp4r7EkDUBc'
    };    
    var options = {
        url: 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=127.1058342,37.359708&goal=129.075986,35.179470&option=trafast',
        headers: headers
    };
    var request = require('request');
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var jsonData = JSON.parse(body);
            var pathdata = new Array();
            for (var i = 0; i < jsonData['route']['trafast'][0]['path'].length; i++) {
                pathdata[i]=jsonData['route']['trafast'][0]['path'][i];
            }
            console.log(pathdata);
            var path=JSON.stringify(pathdata);
            fs.writeFile("test.json", path, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    request(options, callback);
}
exports.helloworld = helloworld;
//require('dotenv').config({ path: "/home/ubuntu/backEnd/nodejs/naver_map/map/.env"});
/*let naverModule = [
    //[0] gecode
    {
        uri: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
        qs: {query: "주소",}
    }, 
    // [1] direction5-driving
    {
        uri: "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving",
        qs: {
            start: "37.3595704, 127.105399",
             goal: "37.2762087, 127.0808982", 
             option: "trafast",
             waypoints: "",
            },
    },
];
require(['require', 'express'], function (require) {
    var express = require('express'); // <-ERROR
    app = express();
});
//const request = require('request-promise-native');
//환경변수
//const API_ID = process.env.API_ID;  
//const API_KEY = process.env.API_KEY;
//naverModule 변수

module.exports =  {
    getAPI: (mode = 0, qs) => new Promise((res, rej) => {
        console.log(mode, qs);
        const options = {
            uri: naverModule[mode].uri,
            qs : qs,
            headers:{
                'X-NCP-APIGW-API-KEY-ID': uzlzuhd2pa,
                'X-NCP-APIGW-API-KEY': INnDxBgwB6Tt20sjSdFEqi6smxIBUNp4r7EkDUBc,
            }
        };
        app.get(options).then((body) => {
            let data = JSON.parse(body);
            console.log("query :", qs);
            console.log(data);
            if(data.code > 0) {
                rej(data.message);
            }
            if(mode == 0) { res(data.addresses); }
            else if(mode == 1 || mode == 2) {res(data.route); }
        }).catch(err => {
            console.log(err);
            rej(err);
        });
    }),
    //query 형태 반환 데이터 타입 반환
    getQuery: function(dataMode){
        console.log(naverModule[dataMode].qs);
        return naverModule[dataMode].qs;
    }
}*/