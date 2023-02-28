const express = require("express");
const postRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

postRoutes.route("/posts").get(async (req, res) => {
  await dbo
    .getDb()
    .collection("Posts")
    .find({})
    .toArray()
    .then((value) => res.json(value));
});

postRoutes.route("/posts/add").post(async (req, res) => {
  await dbo.getDb().collection("Posts").insertOne({
    author: req.body.author,
    content: req.body.content,
    created: Date.now(),
  });
});

module.exports = postRoutes;
