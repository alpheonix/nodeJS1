const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';
const dbName = 'dates';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Get the collection
    const col = db.collection('dates');

    // Insert single document
    let r = await col.insertOne({from:'Nassim',msg:'slt'});
    assert.equal(1, r.insertedCount);/*
    // Remove multiple documents
    r = await col.deleteMany({from:9});
    assert.equal(2, r.deletedCount);*/
    let test = await col.find().toArray();
    console.log(test);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
