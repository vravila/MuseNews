const SongsMongoSingleton = require("./SongsMongoSingleton.js");
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

router.get(
  "/querySongs/:searchterms/:sort/:artistSearch/:minPlayCount/:maxPlayCount/:minListeners/:maxListeners/:minRank/:maxRank/:page",
  (req, res) => {
    console.log("GET to /querySongs for ==> ");
    console.log(req.params.searchterms);
    console.log(req.params.sort);
    console.log(req.params.artistSearch);
    console.log(req.params.minPlayCount);
    console.log(req.params.maxPlayCount);
    console.log(req.params.minListeners);
    console.log(req.params.maxListeners);
    console.log(req.params.minRank);
    console.log(req.params.maxRank);
    console.log(req.params.page);
    querySongs(
      req.params.searchterms,
      req.params.sort,
      req.params.artistSearch,
      req.params.minPlayCount,
      req.params.maxPlayCount,
      req.params.minListeners,
      req.params.maxListeners,
      req.params.minRank,
      req.params.maxRank,
      req.params.page
    ).then((returned) => {
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

router.get("/getSongsByRank/:rank", (req, res) => {
  console.log("GET to /getSongsByRank for " + req.params.rank);
  getSongByRank(req.params.rank).then((returned) => {
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
  getSongTweets(req.params.name).then((returned) => {
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
  getSongsByRankRanges(req.params.startNo, req.params.endNo).then(
    (returned) => {
      console.log("Returned!");
      console.log(returned);
      if (returned.length === 0) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    }
  );
});

router.get("/getSongByNameAndArtist/:songname/:artistname", (req, res) => {
  console.log(
    "GET to /getSongByNameAndArtist for " +
      req.params.songname +
      " by " +
      req.params.artistname
  );
  getSongByNameAndArtist(req.params.songname, req.params.artistname).then(
    (returned) => {
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
  getSongsByAnArtist(req.params.artistname).then((returned) => {
    console.log("Returned!");
    console.log(returned);
    if (returned.length === 0) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

async function querySongs(
  searchterms,
  sort,
  artistSearch,
  minPlayCount,
  maxPlayCount,
  minListeners,
  maxListeners,
  minRank,
  maxRank,
  page
) {
  var start = 1;
  var end = 10;
  var query = {};
  var sortQuery = {};
  if (searchterms != "none") {
    query["name"] = { $regex: ".*" + searchterms + ".*" };
  }

  if (sort === "nameAsc") {
    sortQuery = { name: 1 };
  } else if (sort === "nameDesc") {
    sortQuery = { name: -1 };
  } else if (sort === "listeners") {
    sortQuery = { "stats.listeners": 1 };
  } else {
    sortQuery = { rank: 1 };
  }

  if (artistSearch != "none") {
    query["artist.name"] = { $regex: ".*" + artistSearch + ".*" };
  }

  if (minPlayCount === "none") {
    if (maxPlayCount !== "none") {
      query["playcount"] = { $gte: 0, $lte: parseInt(maxPlayCount) };
    }
  } else {
    if (maxPlayCount === "none") {
      query["playcount"] = {
        $gte: parseInt(minPlayCount),
        $lte: 1000000000,
      };
    } else {
      query["playcount"] = {
        $gte: parseInt(minPlayCount),
        $lte: parseInt(maxPlayCount),
      };
    }
  }

  if (minListeners === "none") {
    if (maxListeners !== "none") {
      query["listeners"] = { $gte: 0, $lte: parseInt(maxListeners) };
    }
  } else {
    if (maxListeners === "none") {
      query["listeners"] = {
        $gte: parseInt(minListeners),
        $lte: 1000000000,
      };
    } else {
      query["listeners"] = {
        $gte: parseInt(minListeners),
        $lte: parseInt(maxListeners),
      };
    }
  }

  if (minRank === "none") {
    if (maxRank !== "none") {
      query["rank"] = { $gte: 1, $lte: parseInt(maxRank) };
    }
  } else {
    if (maxRank === "none") {
      query["rank"] = {
        $gte: parseInt(minRank),
        $lte: 300,
      };
    } else {
      query["rank"] = {
        $gte: parseInt(minRank),
        $lte: parseInt(maxRank),
      };
    }
  }

  const PAGE_SIZE = 10;
  const skip = (page - 1) * 10;

  // const testQuery = {
  //   "stats.playcount": { $gte: 1, $lte: 1000000000 }
  // };

  console.log(query);
  console.log(sortQuery);

  const collection = await SongsMongoSingleton.getInstance();

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

async function getSongByNameAndArtist(song, artist) {
  var returnedSong;
  const collection = await SongsMongoSingleton.getInstance();

  returnedSong = collection.findOne({ name: song, "artist.name": artist });
  console.log(returnedSong);
  console.log("Done looking");
  // client.close();
  return returnedSong;
}

async function getSongsByAnArtist(artist) {
  const collection = await SongsMongoSingleton.getInstance();

  returnedCursorSong = collection.find({ "artist.name": artist });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
  console.log(returnedSong);
  console.log("Done looking");
  // client.close();
  return returnedSong;
}

async function getSongByRank(inputrank) {
  const collection = await SongsMongoSingleton.getInstance();
  returnedSong = collection.findOne({ rank: parseInt(inputrank) });
  console.log(returnedSong);
  console.log("Done looking");
  // client.close();
  return returnedSong;
}

async function getSongsByRankRanges(start, end) {
  const collection = await SongsMongoSingleton.getInstance();
  returnedCursorSong = collection.find({
    rank: { $gt: parseInt(start) - 1, $lt: parseInt(end) + 1 },
  });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
  console.log(returnedSong);
  console.log("Done looking");
  // client.close();
  return returnedSong;
}

function getSongTweets(name) {
  return new Promise(function (resolve, reject) {
    getTweets(name).then(function (tweets) {
      const urls = new Array(5);

      for (i = 0; i < 5; i++) {
        id = tweets.statuses[i].id_str;
        user = tweets.statuses[i].user.screen_name;
        url = "http://twitter.com/" + user + "/status/" + id;
        urls[i] = url;
      }

      //console.log(urls);

      const promises = urls.map((url) => convertToHtml(url));
      Promise.all(promises).then((data) => {
        // data = [promise1,promise2]
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

function testExport() {
  console.log("TEST the EXPORT");
}

module.exports = router;
