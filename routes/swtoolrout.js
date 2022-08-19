var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

// json() 이 없으면 dbconnect_Module.js 로 값이 안가짐
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
console.log("접속 완료");
router.post('/', (req, res, next) => {
    var type = req.query.type;
    if(type == 'list'){
        //Swtool 리스트 조회
        try{
            //mysql api 모듈(CRUD)
            var dbconnect_Module = require('./dbconnect_Module');

            //Mysql 쿼리 호출 정보 입력
            req.body.mapper = 'swToolsMapper' // mybatis xml 파일명
            req.body.crud = 'select'; // CRUD 중 하나 입력
            req.body.mapper_id = 'selectSwToolsList';
            console.log("swtoolreout.js ################################ " +req.body.mapper);
            
            router.use('/', dbconnect_Module);
            next('route')
        } catch (error) {
            console.log('[swtoolrout] list error : ' + e);
        }
    } else if (type == "insertBoard") {
        try{
            //Mysql API모듈(CRUD)
            var dbconnect_Module = require('./dbconnect_Module');
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'insert';
            req.body.mapper_id = 'insertBoard';

            router.use('/', dbconnect_Module);
            next('route')
        } catch(e){
            console.log('[swtoolrout] insertBoard error : ' + e);
        }
    } else if (type == "updateBoard") {
        try{
            //Mysql API모듈(CRUD)
            var dbconnect_Module = require('./dbconnect_Module');
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'update';
            req.body.mapper_id = 'updateBoard';

            router.use('/', dbconnect_Module);
            next('route')
        } catch(e){
            console.log('[swtoolrout] updateBoard error : ' + e);
        }
    } else if (type == "deleteBoard") {
        try{
            //Mysql API모듈(CRUD)
            var dbconnect_Module = require('./dbconnect_Module');
            req.body.mapper = 'swToolsMapper';
            req.body.crud = 'delete';
            req.body.mapper_id = 'deleteBoard';

            router.use('/', dbconnect_Module);
            next('route')
        } catch(e){
            console.log('[swtoolrout] deleteBoard error : ' + e);
        }
    } 
});

// 테스트용
// router.get('/', (req, res)=> {
//     const json_res = {};
//     json_res.msg = "swtool router Get!"
//     res.send(json_res);
// })

module.exports = router;
