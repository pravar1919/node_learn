const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const { log, auth } = require("./middleware");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(helmet()); // Helps secure your apps by setting various HTTP headers.

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("tiny")); // HTTP request logger.
}
// Middleware
app.use(log);

app.use(auth);

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  res.send({ success: "hello" });
});

app.get("/courses", (req, res) => {
  res.send({ data: courses });
});

app.get("/courses/:id", (req, res) => {
  courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course) res.status(404).send("No Course Found!!!");
  res.send(course).status(200);
});

app.post("/courses/", (req, res) => {
  const { value, error } = validateCourses(req.body);
  if (error) return res.status(400).send(error.details);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/courses/:id", (req, res) => {
  courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course)
    return res.status(404).send("No Course With The given ID Was Found!!!");

  const { value, error } = validateCourses(req.body);
  if (error) return res.status(400).send(error.details);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/courses/:id", (req, res) => {
  courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course)
    return res.status(404).send("No Course With The given ID Was Found!!!");

  const index = courses.indexOf(course);
  console.log(courses.find((course) => course.id === parseInt(courseId)));
  courses.splice(index, 1);
  res.status(204).send();
});

const validateCourses = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});

console.log("Application name: " + config.get("name"));
console.log("Mail Server " + config.get("mail.host"));
console.log("Mail Password " + config.get("mail.password"));
