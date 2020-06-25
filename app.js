var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var morgan = require('morgan')
var logger = require('./utils/logger')
var ejsMate = require('ejs-mate')
var moment = require('moment')
var getNepaliNumber = require('get-nepali-number')

var routes = require('./routes')
var crons = require('./crons')
var events = require('./events')

var app = express()

// view engine setup
app.engine('ejs', ejsMate) // use ejs-locals for all ejs templates
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('tiny', { stream: logger.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

// register helpers
app.locals.getNepaliNumber = getNepaliNumber

app.locals.moment = moment

// schedule all crons
crons.boot()

// boot all events
events.boot()

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
