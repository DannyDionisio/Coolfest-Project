"use strict";

const { join } = require("path");
const express = require("express");
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const serveFavicon = require("serve-favicon");
const indexRouter = require("./routes/index");
const eventRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);


mongoose
  .connect('mongodb://localhost/coolfest-database', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });




const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(
  sassMiddleware({
    src: join(__dirname, "public"),
    dest: join(__dirname, "public"),
    outputStyle:
      process.env.NODE_ENV === "development" ? "nested" : "compressed",
    sourceMap: true
  })
);
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "basic-auth-secret", ///can be any string 
  cookie: { maxAge: 60000 }, //time cookie will stay in your machine
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day ttl it is time to logout
  })
}));


app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});


app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/events", eventRouter);

module.exports = app;
