var express = require('express');
var router = express.Router();
var naverAPI = require('./naverAPI');
var { Path, DetailPath } = require('./models');
//const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


//!!!!현재 daumAPI를 통해 검색하기 때문에 아래 기능은 사용하지 않는다!!!!
/* search */
 router.post('/search', function(req, res, next) {
   console.log(req.body.search);
   var qs = naverAPI.getQuery(0);
   qs.query = req.body.search;
   console.log(qs);
   naverAPI.getAPI(0, qs).then(data => {
     console.log("======data==========");
     console.log(data);
     data.forEach(e => {
       console.log(e.roadAddress);
       console.log(e.jibunAddress);
       console.log(e.x, e.y);
     });
     res.status(200).json(data);
   });
 });

/**
 * 경로 탐색시에 수행되는 router middleware로 
 * naverAPI를 통해 경로탐색 데이터를 받아오고
 * sequelize 모듈을 사용하여 db에 저장후 
 * 사용자에게 경로탐색 데이터를 json 형식으로 클라이언트에게 반환해 준다.
 */
router.post('/driving', function(req, res, next) {
  //1 driving
  console.log("driving");
  console.log("req.body");
  console.log(req.body);

  //mode는 naverAPI에서 사용할 기능을 뜻하며 1는 경유지가 없는 길찾기, 2는 경유지가 있는 길찾기를 통한다. 
  let mode = req.body.waypoints === "" ? 1 : 2;   //경유지가 없는 경우에는 post데이터 waypoints값이 ""로 비워있다.

  var qs = naverAPI.getQuery(mode);   //naverAPI에 요청시 알맞는 쿼리 형태를 naverAPI.getQuery(mode)를 통해서 가져와준다.
  
  qs.start = req.body.start;          //post데이터에 출발지에 위도 경도를 가져온다.
  qs.goal = req.body.goal;            //post데이터에 도착지에 위도 경도를 가져온다.
  qs.option = req.body.option;        //빠른길, 편한길, 최적, 무료우선 인지 경로검색시에 옵션을 post데이터에서 가져온다.
  qs.waypoints = req.body.waypoints;  //post데이터에 경유지들에 위도 경도를 가져온다.

  console.log(qs);

  // naverAPI에서 drving기능을 통해 경로 및 시간에 대한 데이터 가져오기
  naverAPI.getAPI(mode, qs).then(async (data) =>  {
    console.log("naverAPI sucess");
    let guide = data[Object.keys(data)[0]][0].guide;
    let guide_db = "";  //db에 guide데이터를 저장시키기 위한 TEXT형식을 저장할 변수

    //guide를 db에 저장하기 위해 구분자로 ,를 넣고 TEXT형태로 만들어준다.
    guide.forEach((e, index) => {
      guide_db += e.instructions;
      guide_db += index < guide.length -1 ? "," : ""; 
    });

    //db에 저장할 데이터
    let db_dt = {      
      start: req.body.start_name,
      start_ps: req.body.start,
      goal: req.body.goal_name,
      goal_ps: req.body.goal,
      way: req.body.way_name,
      way_ps: req.body.waypoints,
    };

    //로그인이 되어 있는 경우 userId컬럼에 사용자의 아이디가 아닌 db의 고유식별 id를 넣는다.
    //!!!userId를 외래키로 user테이블과 조인시 사용된다.
    if(req.user) {
      db_dt["userId"] =  req.user.id;
    }
    //sequelize를 통해 검색기록 path테이블에 데이터 넣기 
    const Paths = await Path.create(db_dt);
    //sequleize를 통해 상세경로 DetailPath테이블에 넣기 !!!pathId를 외래키로 path와 조인시 사용된다.
    const sql_detailPath = await DetailPath.create({
      guide: guide_db,
      pathId: Paths.id,
    });
    res.status(200).json(data);
  }).catch (err => {
    console.log(err); 
    req.flash('drivingErr',err);
    res.status(404).send(err);
  });
});

module.exports = router;