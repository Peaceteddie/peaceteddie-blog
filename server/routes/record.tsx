const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/posts").get(function (req: any, res: any) {
  let db_connect = dbo.getDb();
  let posts = db_connect.collection("Posts").find({}).toArray();
  res.json(posts);
});

// This section will help you get a single record by id
recordRoutes.route("/posts/:id").get(function (req: any, res: any) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Posts")
    .findOne(myquery, function (err: any, result: any) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/posts/add").post(function (req: any, res: any) {
  let db_connect = dbo.getDb();
  let myobj = {
    author: req.body.author,
    content: req.body.content,
  };
  db_connect.collection("Posts").insertOne(myobj, function (res: any) {
    res.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req: any, res: any) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      author: req.body.author,
      content: req.body.content,
    },
  };
  db_connect
    .collection("Posts")
    .updateOne(myquery, newvalues, function (res: any) {
      console.log("1 document updated");
      res.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req: any, res: any) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Posts")
    .deleteOne(myquery, function (err: any, obj: any) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(obj);
    });
});

module.exports = recordRoutes;
