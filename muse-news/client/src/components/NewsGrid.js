import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import NewsArticle from "./NewsArticle.js";
import "./../App.css";

const GoogleNewsRss = require("google-news-rss");
const googleNews = new GoogleNewsRss();

class NewsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: this.props.terms,
      page: this.props.page,
      sort: this.props.sort,
      filter: this.props.filter,
      articles: [
        {
          title: "ERROR",
          preview: "Something went wrong",
          img: "./../newsImage.jpg",
        },
        {
          title: "ERROR",
          preview: "Something went wrong",
          img: "./../newsImage.jpg",
        },
        {
          title: "ERROR",
          preview: "Something went wrong",
          img: "./../newsImage.jpg",
        },
        {
          title: "ERROR",
          preview: "Something went wrong",
          img: "./../newsImage.jpg",
        },
      ],
    };
    //this.getNews(this.state.terms);
    this.getNews();
    this.forceUpdate();
  }

  getNews() {
    var sortBy = "";
    var filterBy = "";
    //get sort parameter
    if (this.state.sort === "date") {
      sortBy = "&sortBy=publishedAt";
    } else if (this.state.sort === "popularity") {
      sortBy = "&sortBy=popularity";
    } else if (this.state.sort === "relevance") {
      sortBy = "&sortBy=relevancy";
    }
    //get filter parameter
    if (this.state.filter === "24h") {
      var startTime = new Date();
      startTime.setDate(startTime.getDate() - 1); //one day back
      filterBy = "&from=" + startTime.toISOString();
    } else if (this.state.filter === "48h") {
      var startTime = new Date();
      startTime.setDate(startTime.getDate() - 2); //two days back
      filterBy = "&from=" + startTime.toISOString();
    } else if (this.state.filter === "7d") {
      var startTime = new Date();
      startTime.setDate(startTime.getDate() - 7); //one week back
      filterBy = "&from=" + startTime.toISOString();
    }
    //get terms
    var q = this.state.terms;
    //get page
    var page = this.state.page;
    let apikey = "bc2ebdb795c5488bb34601ca89a75e7f";
    let requestURL =
      "https://newsapi.org/v2/everything?q=" +
      q +
      filterBy +
      sortBy +
      "&page=" +
      page +
      "&apiKey=" +
      apikey;
    const resp = fetch(requestURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var newArticles = [];
        for (var i = 0; i < data.articles.length; i++) {
          newArticles.push({
            title: data.articles[i].title,
            preview: data.articles[i].description,
            img: data.articles[i].urlToImage,
            term: q,
          });
        }
        this.setState({ articles: newArticles }, () => this.forceUpdate());
      });
    console.log(this.state);
  }

  componentDidUpdate() {
    if (this.state.terms !== this.props.terms) {
      this.setState(
        {
          terms: this.props.terms,
          page: this.props.page,
        },
        () => this.getNews()
      );
    } else if (
      this.state.terms === "Splash" &&
      this.state.page != this.props.page
    ) {
      this.setState(
        {
          terms: "Billie Eilish",
          page: this.props.page
        },
        () => this.getNews()
      );
    } else if (this.state.page !== this.props.page) {
      this.setState(
        {
          page: this.props.page,
          sort: this.props.sort,
          filter: this.props.filter,
        },
        () => this.getNews()
      );
    } else if (this.state.sort !== this.props.sort) {
      this.setState(
        {
          sort: this.props.sort,
        },
        () => this.getNews()
      );
    } else if (this.state.filter !== this.props.filter) {
      this.setState(
        {
          filter: this.props.filter,
        },
        () => this.getNews()
      );
    }
  }

  render() {
    var cards = [];
    for (var i = 0; i < this.state.articles.length; i++) {
      var linker = this.state.articles[i].term + "/";
      linker += "" + (20 * (this.state.page - 1) + i);
      cards.push(
        <NewsArticle
          id="newsArticle"
          title={this.state.articles[i].title}
          preview={this.state.articles[i].preview}
          img={this.state.articles[i].img}
          link={linker}
        />
      );
    }
    var grid = [];
    for (var r = 0; r < 5; r++) {
      var row = [];
      for (var c = 0; c < 4; c++) {
        var col = <Col>{cards[r * 4 + c]}</Col>;
        row.push(col);
      }
      grid.push(<Row>{row}</Row>);
    }
    return <div style={{ marginLeft: 20 }}>{grid}</div>;
  }
}
export default NewsGrid;
