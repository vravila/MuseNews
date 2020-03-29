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
    it("should get news articles with a valid page", done => {
      chai
        .request(app)
        .get("/api/news/getNewsPage/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should fail to get news articles with a valid page", done => {
      chai
        .request(app)
        .get("/api/news/getNewsPage/10")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should fail to get news articles with a valid page (that is negative)", done => {
      chai
        .request(app)
        .get("/api/news/getNewsPage/-1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
