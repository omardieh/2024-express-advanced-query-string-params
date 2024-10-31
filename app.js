require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Book = require("./models/Book.model");
const Goose = require("./models/Goose.model");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const cities = ["Miami", "Madrid", "Barcelona"];

app.get("/city-list", (req, res) => {
  const { newCity } = req.query;
  if (newCity) {
    if (!cities.includes(newCity)) cities.push(newCity);
  }
  res.json({ cities: cities });
});

app.post("/api/goose", (req, res) => {
  Goose.create({
    title: "Just a name",
  }).then((createdGoose) => {
    console.log(createdGoose);
    res.send(createdGoose);
  });
});

app.post("/api/books", (req, res) => {
  if (!req.body?.title) {
    res.status(404).send("nothing in the req.body");
    return;
  }
  Book.create({
    title: req.body.title,
    codeISBN: req.body.codeISBN,
  }).then((createdBook) => {
    console.log(createdBook);
    res.json(createdBook);
  });
});

app.get("/api/books", (req, res) => {
  Book.find().then((foundBooks) => {
    console.log(foundBooks);
    res.json(foundBooks);
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-intro-092014")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info("app is running, please visit : http://localhost:" + port);
});
