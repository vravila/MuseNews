const NewsMongoSingleton = require("./NewsMongoSingleton.js");
const express = require("express");
const router = express.Router(); //ret a funx
const app = express();

const assert = require("assert");

router.get("/", (req, res) => {
  res.status(201).send("HAHAHAHAHA");
});

router.get("/getNewsPage/:page", (req, res) => {
  getNewsPage(req.params.page).then((returned) => {
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
  return returnedNews;
}

module.exports = router;
