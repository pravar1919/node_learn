const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

router.get("/", (req, res) => {
  res.send({ data: courses });
});

router.get("/:id", (req, res) => {
  courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course) res.status(404).send("No Course Found!!!");
  res.send(course).status(200);
});

router.post("/", (req, res) => {
  const { value, error } = validateCourses(req.body);
  if (error) return res.status(400).send(error.details);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  courseId = req.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));
  if (!course)
    return res.status(404).send("No Course With The given ID Was Found!!!");

  const { value, error } = validateCourses(req.body);
  if (error) return res.status(400).send(error.details);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
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

module.exports = router;
