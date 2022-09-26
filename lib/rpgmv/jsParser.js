// To do

// load filesystem module
var fs = require("fs");

// read JS file and execute it
var data = fs.readFileSync("./plugins.js", {encoding: "utf8"});
eval(data);

console.log($plugins[0]);