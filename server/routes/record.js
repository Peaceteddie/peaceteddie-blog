import { Router } from "express";
// This will help us connect to the database
import { getDb } from "../db/conn";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = Router();

// This section will help you get a list of all the records.
recordRoutes.route("/posts").get(function (req, res) {
  let db_connect = getDb();
  db_connect
    .collection("Posts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/posts/:id").get(function (req, res) {
  let db_connect = getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Posts").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/posts/add").post(function (req, response) {
  let db_connect = getDb();
  let myobj = {
    // TODO: add values
  };
  db_connect.collection("Posts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      // TODO: add values
    },
  };
  db_connect
    .collection("Posts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Posts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

export default recordRoutes;
