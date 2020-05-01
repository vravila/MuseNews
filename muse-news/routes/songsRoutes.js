const SongsMongoSingleton = require("./SongsMongoSingleton.js");
const express = require("express");
const router = express.Router(); //ret a funx

router.get("/", (req, res) => {
  console.log("Root!!!");
  res.status(201).send("HAHAHAHAHA");
});

router.get(
  "/querySongs/:searchterms/:sort/:artistSearch/:minPlayCount/:maxPlayCount/:minListeners/:maxListeners/:minRank/:maxRank/:page",
  (req, res) => {
    querySongs(req.params).then((returned) => {
      if (returned === null || returned.length == 0) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    });
  }
);

router.get("/getSongsByRank/:rank", (req, res) => {
  getSongByRank(req.params.rank).then((returned) => {
    if (returned === null) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

router.get("/getSongTweets/:name", (req, res) => {
  getSongTweets(req.params.name).then((returned) => {
    res.status(200).json(returned);
  });
});

router.get("/getSongsByRankRanges/:startNo/:endNo", (req, res) => {
  getSongsByRankRanges(req.params.startNo, req.params.endNo).then(
    (returned) => {
      if (returned.length === 0) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    }
  );
});

router.get("/getSongByNameAndArtist/:songname/:artistname", (req, res) => {
  getSongByNameAndArtist(req.params.songname, req.params.artistname).then(
    (returned) => {
      if (returned === null) {
        res.status(404).json(returned);
      } else {
        res.status(200).json(returned);
      }
    }
  );
});

router.get("/getSongsByAnArtist/:artistname", (req, res) => {
  getSongsByAnArtist(req.params.artistname).then((returned) => {
    if (returned.length === 0) {
      res.status(404).json(returned);
    } else {
      res.status(200).json(returned);
    }
  });
});

async function querySongs(params) {
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

  if (params.artistSearch != "none") {
    query["artist.name"] = { $regex: ".*" + params.artistSearch + ".*" };
  }

  if (params.minPlayCount === "none") {
    if (params.maxPlayCount !== "none") {
      query["playcount"] = { $gte: 0, $lte: parseInt(params.maxPlayCount) };
    }
  } else {
    if (params.maxPlayCount === "none") {
      query["playcount"] = {
        $gte: parseInt(params.minPlayCount),
        $lte: 1000000000,
      };
    } else {
      query["playcount"] = {
        $gte: parseInt(params.minPlayCount),
        $lte: parseInt(params.maxPlayCount),
      };
    }
  }

  if (params.minListeners === "none") {
    if (params.maxListeners !== "none") {
      query["listeners"] = { $gte: 0, $lte: parseInt(params.maxListeners) };
    }
  } else {
    if (params.maxListeners === "none") {
      query["listeners"] = {
        $gte: parseInt(params.minListeners),
        $lte: 1000000000,
      };
    } else {
      query["listeners"] = {
        $gte: parseInt(params.minListeners),
        $lte: parseInt(params.maxListeners),
      };
    }
  }

  if (params.minRank === "none") {
    if (params.maxRank !== "none") {
      query["rank"] = { $gte: 1, $lte: parseInt(params.maxRank) };
    }
  } else {
    if (params.maxRank === "none") {
      query["rank"] = {
        $gte: parseInt(params.minRank),
        $lte: 300,
      };
    } else {
      query["rank"] = {
        $gte: parseInt(params.minRank),
        $lte: parseInt(params.maxRank),
      };
    }
  }

  const PAGE_SIZE = 10;
  const skip = (params.page - 1) * 10;

  const collection = await SongsMongoSingleton.getInstance();

  returnedCursorArtist = collection.find(query).skip(skip).limit(PAGE_SIZE);
  const returnedArtist = returnedCursorArtist.sort(sortQuery).toArray();
  return returnedArtist;
}

async function getSongByNameAndArtist(song, artist) {
  var returnedSong;
  const collection = await SongsMongoSingleton.getInstance();
  returnedSong = collection.findOne({ name: song, "artist.name": artist });
  return returnedSong;
}

async function getSongsByAnArtist(artist) {
  const collection = await SongsMongoSingleton.getInstance();
  returnedCursorSong = collection.find({ "artist.name": artist });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
  return returnedSong;
}

async function getSongByRank(inputrank) {
  const collection = await SongsMongoSingleton.getInstance();
  returnedSong = collection.findOne({ rank: parseInt(inputrank) });
  return returnedSong;
}

async function getSongsByRankRanges(start, end) {
  const collection = await SongsMongoSingleton.getInstance();
  returnedCursorSong = collection.find({
    rank: { $gt: parseInt(start) - 1, $lt: parseInt(end) + 1 },
  });
  const returnedSong = returnedCursorSong.sort({ rank: 1 }).toArray();
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
