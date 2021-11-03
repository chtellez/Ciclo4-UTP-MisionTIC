var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var auth = require("./auth/main_auth")

//Immportamos la configuracion de la base de datos
var database = require("./config/database");

//Mongo connection
database.mongoConnect();

app.use(auth)

// Router
var empleadosRouter = require("./routes/empleadosRouter");
const { Router } = require("express");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// conexion de mongo
database.mongoConnect();

// Routes
app.use("/empleados", empleadosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
