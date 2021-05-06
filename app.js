var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// DEPENDENCY for LOWDB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const robotsRouter = require('./routes/robots')

//import of security middleware
const { setCors } = require('./middleware/security')

var app = express();

// error handling
app.use((err, req, res, next) => {
    res.status(500).send({
        error: {
            message: err.message
        }
    })
})

app.use(logger('dev'));
// initialize the adapter to the mock db file
const adapter = new FileSync('data/db.json')

// SET UP LOWDB DATABASE
const db = low(adapter)


db.defaults({
    robots: [],
}).write();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set CORS to omit security errors
app.use(setCors);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/robots', robotsRouter);


module.exports = app;
