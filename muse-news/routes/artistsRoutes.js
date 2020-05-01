const ArtistsMongoSingleton = require("./ArtistsMongoSingleton.js");
const express = require("express");
const router = express.Router(); //ret a funx
const app = express();
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: "r0cNjq1UbABQJUwGumA10eSOV",
  consumer_secret: "VkWntyt2QYkphjnQrlebjTb3dic6sr7Rt8GjU76qWB5n6412EU",
  access_token_key: "1230301995833098240-g69SboEJvrkVfOgoS9Nx58WviZUhCu",
  access_token_secret: "xXyX0hIiP3CXKdiHW5MAREfnUskmi4Q2bXLAhjdAPr1Al",
});

const assert = require("assert");

router.get("/", (req, res) => {
  console.log("Root!!!");
  res.status(201).send("HAHAHAHAHA");
});

router.get("/testExport", (req, res) => {
  testExport();
  res.status(200).send("Successfully Reached Endpoint");
});

router.get(
  "/queryArtists/:searchterms/:sort/:ontour/:minPlayCount/:maxPlayCount/:minListeners/:maxListeners/:page",
  (req, res) => {
    console.log("GET to /queryArtists for ==> ");
    console.log(req.params.searchterms);
    console.log(req.params.sort);
    console.log(req.params.ontour);
    console.log(req.params.minPlayCount);
    console.log(req.params.maxPlayCount);
    console.log(req.params.minListeners);
    console.log(req.params.maxListeners);
    console.log(req.params.page);
    queryArtists(req.params).then((returned) => {
      console.log("Returned!");
      // console.log(returned);
      for (var i = 0; i < returned.length; i++) {
        console.log(returned[i]["name"]);
      }
      if (returned === null || returned.length == 0) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    });
  }
);

router.get("/getArtistByRank/:rank", (req, res) => {
  console.log("GET to /getArtistByRank for " + req.params.rank);
  getArtistByRank(req.params.rank).then((returned) => {
    console.log("Returned!");
    console.log(returned);
    if (returned === null) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

router.get("/getArtistByRankRanges/:startNo/:endNo", (req, res) => {
  console.log(
    "GET to /getArtistByRankRanges for " +
      req.params.startNo +
      " to " +
      req.params.endNo
  );
  getArtistByRankRanges(req.params.startNo, req.params.endNo).then(
    (returned) => {
      console.log("Returned!");
      console.log(returned + typeof returned + returned.length);
      if (returned.length === 0) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    }
  );
});

router.get("/getArtistByName/:name", (req, res) => {
  console.log("GET to /getArtist for " + req.params.name);
  getArtistByName(req.params.name).then((returned) => {
    console.log("Returned!");
    console.log(returned);
    if (returned === null) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

router.get("/getArtistTweets/:name", (req, res) => {
  //res.status(200).json("testing")
  //console.log("HERE")
  getArtistTweets(req.params.name).then((returned) => {
    res.status(200).json(returned);
  });
});

async function queryArtists(params) {
  var query = {};
  var sortQuery = {};
  if (params.searchterms != "none") {
    query["name"] = { $regex: ".*" + params.searchterms + ".*" };
  }

  if (params.sort === "nameAsc") {
    sortQuery = { name: 1 };
  } else if (params.sort === "nameDesc") {
    sortQuery = { name: -1 };
  } else if (params.sort === "listeners") {
    sortQuery = { "stats.listeners": 1 };
  } else {
    sortQuery = { rank: 1 };
  }

  if (params.ontour === "true") {
    query["ontour"] = "1";
  }

  if (params.minPlayCount === "none") {
    if (params.maxPlayCount !== "none") {
      query["stats.playcount"] = {
        $gte: 0,
        $lte: parseInt(params.maxPlayCount),
      };
    }
  } else {
    if (params.maxPlayCount === "none") {
      query["stats.playcount"] = {
        $gte: parseInt(params.minPlayCount),
        $lte: 1000000000,
      };
    } else {
      query["stats.playcount"] = {
        $gte: parseInt(params.minPlayCount),
        $lte: parseInt(params.maxPlayCount),
      };
    }
  }

  if (params.minListeners === "none") {
    if (params.maxListeners !== "none") {
      query["stats.listeners"] = {
        $gte: 0,
        $lte: parseInt(params.maxListeners),
      };
    }
  } else {
    if (params.maxListeners === "none") {
      query["stats.listeners"] = {
        $gte: parseInt(params.minListeners),
        $lte: 1000000000,
      };
    } else {
      query["stats.listeners"] = {
        $gte: parseInt(params.minListeners),
        $lte: parseInt(params.maxListeners),
      };
    }
  }

  const PAGE_SIZE = 10;
  const skip = (params.page - 1) * 10;

  const testQuery = {
    "stats.listeners": { $gt: 10 },
  };

  console.log("ontour: " + typeof params.ontour);
  console.log(query);
  console.log(sortQuery);

  const collection = await ArtistsMongoSingleton.getInstance();
  returnedCursorArtist = collection.find(query).skip(skip).limit(PAGE_SIZE);
  const returnedArtist = returnedCursorArtist.sort(sortQuery).toArray();
  // for (var i = 0; i < returnedArtist["artist"].length; i++) {
  //   console.log(artist[i]["name"]);
  // }
  // console.log(returnedArtist);
  console.log("Done looking");
  // client.close();
  return returnedArtist;
}

async function getArtistByRank(inputrank) {
  const collection = await ArtistsMongoSingleton.getInstance();
  returnedArtist = collection.findOne({ rank: parseInt(inputrank) });
  console.log(returnedArtist);
  console.log("Done looking");
  // client.close();
  return returnedArtist;
}

async function getArtistByRankRanges(start, end) {
  const collection = await ArtistsMongoSingleton.getInstance();
  returnedCursorArtist = collection.find({
    rank: { $gt: parseInt(start) - 1, $lt: parseInt(end) + 1 },
  });
  const returnedArtist = returnedCursorArtist.sort({ rank: 1 }).toArray();
  console.log(returnedArtist);
  console.log("Done looking");
  // client.close();
  return returnedArtist;
}

async function getArtistByName(inputname) {
  var returnedArtist;
  const collection = await ArtistsMongoSingleton.getInstance();

  returnedArtist = collection.findOne({ name: inputname });
  console.log(returnedArtist);
  console.log("Done looking");
  return returnedArtist;
}

function getArtistTweets(name) {
  return new Promise(function (resolve, reject) {
    getTweets(name).then(function (tweets) {
      const urls = new Array(5);

      for (i = 0; i < 5; i++) {
        id = tweets.statuses[i].id_str;
        user = tweets.statuses[i].user.screen_name;
        url = "http://twitter.com/" + user + "/status/" + id;
        urls[i] = url;
      }

      const promises = urls.map((url) => convertToHtml(url));
      Promise.all(promises).then((data) => {
        resolve(data);
      });
    });
  });
}

function getTweets(name) {
  return new Promise(function (resolve, reject) {
    client.get("search/tweets", { q: name, count: 5 }, function (
      error,
      tweets,
      response
    ) {
      resolve(tweets);
    });
  });
}

function convertToHtml(url) {
  return new Promise(function (resolve, reject) {
    client.get("statuses/oembed", { url: url }, function (error, response) {
      resolve(response.html);
    });
  });
}

module.exports = router;
