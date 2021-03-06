var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser')
const passport = require('passport');

require('./middleware/passport');
var app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();



//Connect db
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('connected to DB'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/user', usersRouter);
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Server-side!');
})
app.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});


console.log('Server is running')


module.exports = app;
