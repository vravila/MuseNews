const NewsMongoSingleton = require("./NewsMongoSingleton.js");
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

module.exports = router;
