const express = require("express");
const router = express.Router(); //ret a funx
const app = express();

const assert = require("assert");

router.get("/", (req, res) => {
  console.log("Root!!!");
  res.status(201).send("HAHAHAHAHA");
});

router.get("/testExport", (req, res) => {
  testExport();
  res.status(200).send("Successfully Reached Endpoint");
});

router.get("/getSongsByRank/:rank", (req, res) => {
  console.log("GET to /getSongsByRank for " + req.params.rank);
  getSongByRank(req.params.rank).then(returned => {
    console.log("Returned!");
    console.log(returned);
    if (returned === null) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

router.get("/getSongTweets/:name", (req, res) => {
  //res.status(200).json("testing")
  console.log("HERE");
  getSongTweets(req.params.name).then(returned => {
    res.status(200).json(returned);
  });
});

router.get("/getSongsByRankRanges/:startNo/:endNo", (req, res) => {
  console.log(
    "GET to /getSongByRankRanges for " +
      req.params.startNo +
      " to " +
      req.params.endNo
  );
  getSongsByRankRanges(req.params.startNo, req.params.endNo).then(returned => {
    console.log("Returned!");
    console.log(returned);
    if (returned.length === 0) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

router.get("/getSongByNameAndArtist/:songname/:artistname", (req, res) => {
  console.log(
    "GET to /getSongByNameAndArtist for " +
      req.params.songname +
      " by " +
      req.params.artistname
  );
  getSongByNameAndArtist(req.params.songname, req.params.artistname).then(
    returned => {
      console.log("Returned!");
      console.log(returned);
      if (returned === null) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    }
  );
});

router.get("/getSongsByAnArtist/:artistname", (req, res) => {
  console.log("GET to /getSongsByAnArtist for " + req.params.artistname);
  getSongsByAnArtist(req.params.artistname).then(returned => {
    console.log("Returned!");
    console.log(returned);
    if (returned.length === 0) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

async function getSongByNameAndArtist(song, artist) {
  var returnedSong;
  const dbName = "MuseNewsDatabase";
  const collectionName = "songs";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected...");
  const collection = client.db(dbName).collection(collectionName);
  returnedSong = collection.findOne({ name: song, "artist.name": artist });
  console.log(returnedSong);
  console.log("Done looking");
  client.close();
  return returnedSong;
}

async function getSongsByAnArtist(artist) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "songs";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected...");
  const collection = client.db(dbName).collection(collectionName);
  returnedCursorSong = collection.find({ "artist.name": artist });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
  console.log(returnedSong);
  console.log("Done looking");
  client.close();
  return returnedSong;
}

async function getSongByRank(inputrank) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "songs";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected..." + inputrank);
  const collection = client.db(dbName).collection(collectionName);
  returnedSong = collection.findOne({ rank: parseInt(inputrank) });
  console.log(returnedSong);
  console.log("Done looking");
  client.close();
  return returnedSong;
}

async function getSongsByRankRanges(start, end) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "songs";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected..." + start + " : " + end);
  const collection = client.db(dbName).collection(collectionName);
  returnedCursorSong = collection.find({
    rank: { $gt: parseInt(start) - 1, $lt: parseInt(end) + 1 }
  });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
  console.log(returnedSong);
  console.log("Done looking");
  client.close();
  return returnedSong;
}

function getSongTweets(name) {
  return new Promise(function(resolve, reject) {
    getTweets(name).then(function(tweets) {
      const urls = new Array(5);

      for (i = 0; i < 5; i++) {
        id = tweets.statuses[i].id_str;
        user = tweets.statuses[i].user.screen_name;
        url = "http://twitter.com/" + user + "/status/" + id;
        urls[i] = url;
      }

      //console.log(urls);

      const promises = urls.map(url => convertToHtml(url));
      Promise.all(promises).then(data => {
        // data = [promise1,promise2]
        resolve(data);
      });
    });
  });
}
function getTweets(name) {
  return new Promise(function(resolve, reject) {
    client.get("search/tweets", { q: name, count: 5 }, function(
      error,
      tweets,
      response
    ) {
      resolve(tweets);
    });
  });
}

function convertToHtml(url) {
  return new Promise(function(resolve, reject) {
    client.get("statuses/oembed", { url: url }, function(error, response) {
      resolve(response.html);
    });
  });
}

function testExport() {
  console.log("TEST the EXPORT");
}

module.exports = router;
