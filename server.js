var express = require('express');

// 라우터 정의
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var swtoolRouter = require('./routes/swtoolrout');
var testRouter = require('./routes/test');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', swtoolRouter);
app.use('/test', testRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Listening on port ${port}`))

// module.exports = app;
