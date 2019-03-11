var express = require('express');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());

console.log('Hello Word');

app.listen(port, () => {
  console.log("Listening on port 3000...");
})

app.get("/hello", (req, res) => {
  res.send("Hello World\n");
})

app.post('/chat', (req, res) => {
  switch(req.body.msg) {
    case "ville":
      res.send("Nous sommes à Paris\n");
      break;
    case "météo":
      res.send("Il fait beau\n");
      break;

    case "demain":
      let rawdata = fs.readFileSync('response.json');
      let json = JSON.parse(rawdata);
      if(json.day == null) {
        res.send("Je ne connais pas demain…\n");
      }
      else {
        res.send(json.day);
      }
      break;
    default:
      res.send("Réponse par défaut\n");
      break;
  }
});
