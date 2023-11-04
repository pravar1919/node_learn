const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  // res.send({ success: "hello" });
  res.render("index", { title: "My Express App", message: "Hello!!" });
});

module.exports = router;
