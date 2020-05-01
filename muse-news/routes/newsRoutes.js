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

router.get("/getNewsPage/:page", (req, res) => {
  console.log("GET to /getNewsPage " + req.params.page);
  getNewsPage(req.params.page).then((returned) => {
    console.log("Returned!");
    console.log(returned);
    if (returned.length === 0) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

async function getNewsPage(page) {
  const collection = await NewsMongoSingleton.getInstance();

  returnedCursorNews = collection.find({ page: parseInt(page) });
  const returnedNews = returnedCursorNews.toArray();
  console.log(returnedNews);
  console.log("Done looking");
  // client.close();
  return returnedNews;
}

var NewsMongoSingleton = (function () {
  var instance;

  async function createInstance() {
    const dbName = "MuseNewsDatabase";
    const collectionName = "news";
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    // .then(function(db) {
    console.log("Connected...");
    const collection = client.db(dbName).collection(collectionName);
    return collection;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = router;
