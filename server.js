process.env.NODE_ENV = process.env.NODE_ENV;

// Include Modules
let exp = require("express");
let config = require("./configs/configs");
let express = require("./configs/express");
let mongoose = require("./configs/mongoose");
let path = require("path");
var https = require("https");
var fs = require("fs");

global.appRoot = path.resolve(__dirname);
global.__base = __dirname + "/";
if (global.permission) {
} else {
  global.permission = [];
}

db = mongoose();
app = express();

/* Old path for serving public folder */
app.use("/", exp.static(__dirname + "/"));

var server = http.createServer(app);

server.listen(process.env.PORT, () =>
  console.log(`API running on localhost:${process.env.PORT}`)
);

// console.log("sdsd")
