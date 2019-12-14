"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const serveFavicon = require("serve-favicon");

const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/user");
const eventRouter = require("./routes/events");
const authRouter = require("./routes/auth");

//const eventDetailRouter = require("./routes/event-detail");
//const createEventRouter = require("./routes/create-event");

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

app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use("/user", usersRouter);
app.use("/events", eventRouter);

//app.use("/event-detail", eventDetailRouter);
//app.use("/create-event", createEventRouter);


// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
