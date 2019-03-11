var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());

console.log('Hello Word');

app.post('/chat', (req, res) => {
  switch(req.body.msg) {
    case "ville" :
      res.send("Nous sommes à Paris\n");
      break;
    case "météo" :
      res.send("Il fait beau\n");
      break;
    default :
      res.send("Réponse par défaut\n");
      break;
  }
});

app.get("/hello", (req, res) => {
  res.send("Hello World\n");
})

app.listen(port, () => {
  console.log("Listening on port 3000...");
})
