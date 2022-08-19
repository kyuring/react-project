var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const json_res = {};
  json_res.message = 'json Message!'
  res.send(json_res);
});

router.post('/', function(req, res, next) {
  const json_res = {};
  json_res.message = 'post Message!'
  res.send(json_res);
});

module.exports = router;
