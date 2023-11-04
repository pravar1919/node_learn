const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const { log, auth } = require("./middleware/logger");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", "./views"); //default
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(helmet()); // Helps secure your apps by setting various HTTP headers.
app.use("/", home);
app.use("/courses", courses);

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("tiny")); // HTTP request logger.
}
// Middleware
app.use(log);

app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  startupDebugger(`Listening on port ${port}....`);
});

startupDebugger("Application name: " + config.get("name"));
startupDebugger("Mail Server " + config.get("mail.host"));
dbDebugger("Mail Password " + config.get("mail.password"));
