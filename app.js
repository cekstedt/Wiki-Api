// Module imports.

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const ejs = require("ejs");

// Setting up imports for use.

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB);

// Global Variables.

const PORT = process.env.PORT;

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);

// Get routes.

app.get("/", function(req, res) {
  res.send("Hello");
});

app.get("/articles", function(req, res) {
  Article.find(function(err, foundArticles) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundArticles);
    }
  });
});

// POST routes.

app.post("/articles", function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully added a new article.");
    }
  });
});

// DELETE routes.

app.delete("/articles", function(req, res) {
  Article.deleteMany(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully deleted all articles.");
    }
  });
});

// Server initialization.

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});