const express = require("express");
const router = express.Router(); //ret a funx
const app = express();

const assert = require("assert");

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

// router.get("/getArtistByRank/:startRank/:count", (req, res) => {
//   console.log(
//     "GET to /getArtistByRank for " +
//       req.params.startRank +
//       " to " +
//       req.params.count
//   );
//   var returned = getTopArtists(req.params.startRank, req.params.count).then(
//     function(returned) {
//       console.log("Returned!");
//       console.log(returned);
//       console.log("DONE!");
//       res.status(200).send("Seccessfuly Reached Get Artist By Rank Endpoint");
//     }
//   );
// });

router.get("/getArtistByRank/:rank", (req, res) => {
  console.log("GET to /getArtistByRank for " + req.params.rank);
  getArtistByRank(req.params.rank).then(returned => {
    console.log("Returned!");
    console.log(returned);
    res.status(200).json(returned);
  });
});

router.get("/getArtistByRankRanges/:startNo/:endNo", (req, res) => {
  console.log(
    "GET to /getArtistByRankRanges for " +
      req.params.startNo +
      " to " +
      req.params.endNo
  );
  getArtistByRankRanges(req.params.startNo, req.params.endNo).then(returned => {
    console.log("Returned!");
    console.log(returned);
    res.status(200).json(returned);
  });
});

router.get("/getArtistByName/:name", (req, res) => {
  console.log("GET to /getArtist for " + req.params.name);
  getArtistByName(req.params.name).then(returned => {
    console.log("Returned!");
    console.log(returned);
    res.status(200).json(returned);
  });
});

router.post("/putArtist", (req, res) => {
  console.log("POST to /putArtist");
  console.log(req.body);
  putArtist(req.body);
  res.status(200).send("Successfully posted artist to mongo");
});

router.get("/updateArtists", (req, res) => {
  updateArtists();
  res.status(200).send("Successfully Reached Update Artists Endpoint");
});

function updateArtists() {
  console.log("Hello");
  // const data = fetch(
  //   `https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=10b860590d5168c53783ae9728a9b395&limit=5`
  // );
  // // console.log(process.env.REACT_APP_LASTFM_API_KEY);
  // const items = data.json();
  // console.log(items);
}

async function getTopArtists(startRank, count) {
  var returnArray = new Array();
  // console.log("Get top " + count + " artists starting at " + startRank);
  var i = parseInt(startRank);
  for (; i < parseInt(startRank) + parseInt(count); i++) {
    getArtistByRank(i).then(function(artist) {
      // console.log(
      //   "======>i=" + i + " Start: " + startRank + " Count: " + count
      // );
      // console.log(artist);
      // console.log("\n\n");
      returnArray.push(artist);
    });
    // console.log(artist);
    // returnArray.push(artist);
  }
  // console.log("Return");
  // console.log(returnArray);
  return returnArray;
}

async function getArtistByRank(inputrank) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "artists";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected..." + inputrank);
  const collection = client.db(dbName).collection(collectionName);
  returnedArtist = collection.findOne({ rank: parseInt(inputrank) });
  console.log(returnedArtist);
  console.log("Done looking");
  client.close();
  return returnedArtist;
}

async function getArtistByRankRanges(start, end) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "artists";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected..." + start + " : " + end);
  const collection = client.db(dbName).collection(collectionName);
  returnedCursorArtist = collection.find({
    rank: { $gt: parseInt(start) - 1, $lt: parseInt(end) + 1 }
  });
  const returnedArtist = returnedCursorArtist.sort({ rank: 1 }).toArray();
  console.log(returnedArtist);
  console.log("Done looking");
  client.close();
  return returnedArtist;
}

async function getArtistByName(inputname) {
  var returnedArtist;
  const dbName = "MuseNewsDatabase";
  const collectionName = "artists";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected...");
  const collection = client.db(dbName).collection(collectionName);
  returnedArtist = collection.findOne({ name: inputname });
  console.log(returnedArtist);
  console.log("Done looking");
  client.close();
  return returnedArtist;
}

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
    console.log(artist);
    console.log("Done inserting");

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
