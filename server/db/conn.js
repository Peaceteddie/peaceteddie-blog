const { MongoClient } = require("mongodb");

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect().then(
      (db) => {
        if (db) {
          _db = db.db("Blog");
          console.log(
            "Successfully connected to MongoDB and " + _db.databaseName
          );
        }
      },
      (err) => console.log(err)
    );
  },

  getDb: function () {
    return _db;
  },
};
