// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../server";

var expect = require("chai").expect;
var assert = require("chai").assert;
var chai = require("chai");
var app = require("../index");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("TestSongsPage()", () => {
  context("Get Songs", () => {
    it("should get a song with a valid rank", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRank/10")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should fail trying to get a song with a negative rank", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRank/-10")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get a song with a positive rank out of bounds", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRank/1000")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  context("Get Songs By Range of Ranks", () => {
    it("should get a song with a valid range of rank", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRankRanges/11/20")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should fail trying to get a song with a negative range of rank", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRankRanges/-20/-10")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get a song with a positive range of rank out of bounds", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByRankRanges/1000/1015")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // it("should pass trying to get tweets of a song by name", done => {
    //   chai
    //     .request(app)
    //     .get("/api/songs/getSongTweets/Blinding Lights")
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });

    it("should pass trying to get song by valid name and valid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongByNameAndArtist/Blinding Lights/The Weeknd")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should fail trying to get song by valid name and invalid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongByNameAndArtist/Blinding Lights/Not The Weeknd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get song by invalid name and valid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongByNameAndArtist/Baby Shark/The Weeknd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get song by invalid name and invalid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongByNameAndArtist/Baby Shark/Kedar")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should pass trying to get song by a valid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByAnArtist/The Weeknd")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should fail trying to get song by a invalid artist", (done) => {
      chai
        .request(app)
        .get("/api/songs/getSongsByAnArtist/TKedar")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  context("Query Songs with a Variety of Filters, Sorts and Searches", () => {
    it("should get an song based on search terms", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/Blinding Lights/rank/none/none/none/none/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should fail to get an song based on invalid search terms", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/Kedar/rank/none/none/none/none/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an song based on invalid min play count term", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/The/rank/none/111111111111/none/none/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an song based on invalid min listeners term", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/The/rank/none/none/none/111111111111/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an song based on invalid min rank term", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/The/rank/none/none/none/none/none/1111/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an artisongst based on invalid max listeners term", (done) => {
      chai
        .request(app)
        .get("/api/songs/querySongs/The/rank/none/none/none/none/1/none/none/1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should get an array of artist based on valid search by artist (should return The Hills)", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/The/rank/The Weeknd/none/none/none/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should get an array of songs from 10th page", (done) => {
      chai
        .request(app)
        .get(
          "/api/songs/querySongs/none/rank/none/none/none/none/none/none/none/10"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});
