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
  getNewsPage(req.params.page).then(returned => {
    console.log("Returned!");
    console.log(returned);
    res.status(200).json(returned);
  });
});

async function getNewsPage(page) {
  const dbName = "MuseNewsDatabase";
  const collectionName = "news";
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  // .then(function(db) {
  console.log("Connected..." + page);
  const collection = client.db(dbName).collection(collectionName);

  //   console.log(collection.find({ page: page }).count());

  returnedCursorNews = collection.find({ page: parseInt(page) });
  const returnedNews = returnedCursorNews.toArray();
  console.log(returnedNews);
  console.log("Done looking");
  client.close();
  return returnedNews;
}

function testExport() {
  console.log("TEST the EXPORT");
}

module.exports = router;
