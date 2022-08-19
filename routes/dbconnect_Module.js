var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

router.use(bodyParser.json()); // json 사용하겠다는 의미?

console.log("dbconnect_module.js");
// createPool 사용하여 connection pool 생성
const pool = mysql.createPool({
    connectionLimit : 66, // connection pool에서 최대로 저장할 수 있는 connection 수
    waitForConnections : true, // pool 의 connection 이 모두 사용중 일때 새로운 connection 요청이 들어온 경우 대기 여부 (true : 여유connection 이 생길때까지 대기)
    host : "kyuri.cbr28u990rcv.ap-northeast-2.rds.amazonaws.com",
    port : "3306",
    database : "react", // db명 - database에 생성한 스키마 명 써주면 됨
    user : "admin",
    password : "qq9042qq",
});

router.post("/", (req, res) => {
    //mybatis-mapper 사용하겠다는 의미
    // mybatis-mapper : 자바에서 DB 사용할때 쓰는 프레임워크 
    // -자바코드에서 sql코드를 분리해 별도 파일로 관리 가능(재사용성 높아짐) 
    // -workbench 와 같은 디비 툴에서 사용하던 쿼리 그대로 사용가능함(편의성 높아짐)
    const mybatisMapper = require("mybatis-mapper");
    // req.body 에 json형태로 데이터를 할당함 -> 이것을 가져오기 위해서 bodyParser.json() 을 사용한다고 정의함
    var param = req.body;

    //mybatis mapper 경로 설정
    mybatisMapper.createMapper(['./routes/models/'+param.mapper+'.xml']); // 쿼리를작성할 xml 파일 경로를 파라미터로 전달함
    var time = new Date();
    console.log('##' + time + '##');
    console.log('\n Called Mapper Name = ' + param.mapper);

    // mybatis 에 mysql을 사용하기 때문에 format 언어를 sql로 지정
    var format = {language : 'sql', indent : ' '};
    //mysql 쿼리 정보 세팅
    // getStatement (xml 파일명, mxl파일 안에서 실행될 특정 쿼리,  파라미터, format 변수)
    console.log(param);
    var query = mybatisMapper.getStatement(param.mapper, param.mapper_id, param, format);
    console.log("\n =========================== Node Mybatis Query Log Start ==============================");
    console.log("* mapper namespec : " + param.mapper + "." + param.mapper_id + "* \n");
    console.log(query + "\n");


    pool.getConnection(function(err, connection){
        if(err) {
            console.log("db connection err : " + err );
        }
        // 생성된 연결에 query 함수 사용해 위에 생성한 query 실행함 
        // mysql 서버에서 실행결과 반환시 res에 할당됨
        connection.query(query, function(error, result){
            if(error) {
                console.log("db error : " + error );
            }
            var time2 = new Date();
            console.log('##' + time2 + '##');
            console.log('## Result date list ## :  \n' + result);
            if(result != undefined) {
                string = JSON.stringify(result);
                var json = JSON.parse(string);
                if(req.body.crud == "select") {
                     // select 인 경우 DB에서 조회한 데이터를 json 형태로 res에 담아 react 페이지로 전달
                    res.send({json})
                } else {
                    // 나머지인 경우는 쿼리 성공시 success값만 가져가면 됨
                    res.send("success");
                }
            }else {
                res.send("error");
            }
            console.log("========== Node Mybatis Query Log End =============");
        })
    })
}); 

module.exports = router;