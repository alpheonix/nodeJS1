var express = require('express');

var app = express();

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World");
})

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port 3000...");
})
