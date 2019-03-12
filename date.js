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
    /*let r = await db.collection('dates').insertOne({date:9});
    assert.equal(1, r.insertedCount);
    // Remove multiple documents
    r = await col.deleteMany({date:9});
    assert.equal(6, r.deletedCount);*/
    // Get the cursor
    const cursor = col.find();

    // Iterate over the cursor
    while(await cursor.hasNext()) {
      const doc = await cursor.next();
      console.dir(doc);
    }
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
