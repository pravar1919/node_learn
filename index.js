const express = require("express");
require("dotenv").config();

const Joi = require("joi");

const app = express();
app.use(express.json());

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
  if (error) {
    res.status(400).send(error.details);
    return;
  }
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
  if (!course) {
    res.status(404).send("No Course With The given ID Was Found!!!");
    return;
  }

  const { value, error } = validateCourses(req.body);
  if (error) {
    res.status(400).send(error.details);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});

const validateCourses = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};
