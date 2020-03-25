let express = require("express"),
  router = express.Router(); //ret a funx
const app = express();
// const path = require("path");
// app.use(express.json()); //Allows u to parse JSON to string
// app.use(express.static(path.join(__dirname, "/client/build")));

router.get("/", (req, res) => {
  console.log("Root!!!");
  res.status(201).send("HAHAHAHAHA");
});

router.get("/testExport", (req, res) => {
  testExport();
  res.status(200).send("Successfully Reached Endpoint");
});

function putArtist(artist) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "Artists";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(uri, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    console.log("Connected...");
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const collection = client.db(dbName).collection(collectionName);
    collection.insertOne(artist, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    client.close();
  });
}

function testExport() {
  console.log("TEST the EXPORT");
}

// module.exports.putArtist = putArtist;
// module.exports.testExport = testExport;
module.exports = router;
// // PORT: use process obj
// const port = process.env.PORT || 5000; //use 3000 if no PORT
// // const port = 5000;
// // console.log(
// //   "ENV: " + process.env.PORT + " TEST: " + process.env.REACT_APP_LASTFM_API_KEY
// // );
// app.listen(port, () => console.log(`Listening on port ${port}`));
