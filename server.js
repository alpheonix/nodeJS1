var express = require('express');

var app = express();

console.log('Hello Word');

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port 3000...");
})

app.post('/chat', function (req, res) {
  res.send(req.body[0]);
});
