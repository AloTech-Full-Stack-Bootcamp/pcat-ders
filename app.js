const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(function (req, res, next) {
  console.log("Request:", req.path);
  next();
});
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/photo", (req, res) => {
  res.render("photo");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
