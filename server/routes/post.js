const express = require("express");
const postRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

postRoutes.route("/posts").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Posts")
    .find({})
    .toArray()
    .then((value) => res.json(value));
});

module.exports = postRoutes;
