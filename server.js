var express = require('express');
const fs = require('fs');
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';
const dbName = 'messages';
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());

(async function() {
  const client = new MongoClient(url);

  try {
    app.get("/messages/all", async (req, res) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('messages');
        let test = await col.find().toArray();
        res.send(test);
      }
      catch (err){
        console.log(err.stack);
      }
    });

    app.post('/chat', async (req, res) => {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection('messages');
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
          console.log(json.day);
          await col.insertOne({from:'user',msg:'demain'});
          if(json.day == null) {
            res.send("Je ne connais pas demain…\n");
            await col.insertOne({from:'bot',msg:'Demain: unknown'});
          }
          else {
            await col.insertOne({from:'bot',msg:'Demain: Mercredi'});
            res.send(json.day);
          }
          break;
        case "demain = Mercredi":
          let day = {
              day: 'Mercredi',
          };
          let data = JSON.stringify(day);
          fs.writeFileSync('response.json', data);
          res.send("Demain: Mercredi");
          break;
        default:
          res.send("Réponse par défaut\n");
          break;
      }
    });
    app.delete('/messages/last', async (req, res) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('messages');
        let test = await col.find().toArray();
        let tmpid = test[test.length - 1]._id;
        await col.deleteOne({_id: tmpid});
        res.send('Suppression effectué');
      } catch (err) {
        res.send('Aucun élément à supprimer');
      }
    });
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
  })();

console.log('Hello Word');

app.listen(port, () => {
  console.log("Listening on port 3000...");
})

app.get("/hello", (req, res) => {
  res.send("Hello World\n");
})
