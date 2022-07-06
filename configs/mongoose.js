let config = require("./configs");
let mongoose = require("mongoose");

module.exports = function () {
  var db = mongoose.connect(config.db, config.mongoDBOptions).then(() => {
    console.log("Database connected!!");
  });

  return db;
};
