var express = require('express');

var app = express();

app.get("/helloworld", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World!");
})

app.listen(8080, () => {
  console.log("Listening on port 8080...");
})
