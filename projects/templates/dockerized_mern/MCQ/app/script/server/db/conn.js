const { MongoClient } = require("mongodb");
const Db = process.env.URI;
const client = new MongoClient(Db);

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("mc4it");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
