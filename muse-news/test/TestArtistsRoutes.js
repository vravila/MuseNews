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

describe("TestArtistsPage()", () => {
  context("Get Artists", () => {
    it("should get an artist with a valid rank", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRank/10")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should fail trying to get an artist with a negative rank", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRank/-10")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get an artist with a positive rank out of bounds", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRank/1000")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  context("Get Artists By Range of Ranks", () => {
    it("should get an artist with a valid range of rank", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRankRanges/11/20")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should fail trying to get an artist with a negative range of rank", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRankRanges/-20/-10")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail trying to get an artist with a positive range of rank out of bounds", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByRankRanges/1000/1015")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should pass trying to get an artist by name", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByName/The Weeknd")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should fail trying to get an artist by name", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistByName/Kedar")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should pass trying to get tweets of an artist by name", (done) => {
      chai
        .request(app)
        .get("/api/artists/getArtistTweets/The Weeknd")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  context("Query Artists with a Variety of Filters, Sorts and Searches", () => {
    it("should get an artist based on search terms", (done) => {
      chai
        .request(app)
        .get(
          "/api/artists/queryArtists/The Weeknd/rank/false/none/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should fail to get an artist based on invalid search terms", (done) => {
      chai
        .request(app)
        .get("/api/artists/queryArtists/Kedar/rank/false/none/none/none/none/1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an artist based on invalid min play count term", (done) => {
      chai
        .request(app)
        .get(
          "/api/artists/queryArtists/The/rank/false/111111111111/none/none/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an artist based on invalid min listeners term", (done) => {
      chai
        .request(app)
        .get(
          "/api/artists/queryArtists/The/rank/false/none/none/111111111111/none/1"
        )
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an artist based on invalid max play count term", (done) => {
      chai
        .request(app)
        .get("/api/artists/queryArtists/The/rank/false/none/1/none/none/1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get an artist based on invalid max listeners term", (done) => {
      chai
        .request(app)
        .get("/api/artists/queryArtists/The/rank/false/none/none/none/1/1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should get an array of artist based on valid search with second page", (done) => {
      chai
        .request(app)
        .get("/api/artists/queryArtists/The/rank/false/none/none/none/none/2")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should get an array of artist from 10th page", (done) => {
      chai
        .request(app)
        .get("/api/artists/queryArtists/none/rank/false/none/none/none/none/10")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});
