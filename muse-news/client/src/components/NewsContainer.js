import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Redirect } from "react-router-dom";

import NewsGrid from "./NewsGrid";

class NewsContainer extends Component {
  constructor(props) {
    super(props);
    var typeArg = "Splash";
    if (this.props.terms !== "Splash") typeArg = "artist";
    this.state = {
      terms: this.props.terms,
      type: typeArg,
      page: 1,
      filter: "None",
      sort: "None",
      filter: "None",
      dne: false,
    };
    this.search = this.search.bind(this);
    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
    this.dateSort = this.dateSort.bind(this);
    this.popularitySort = this.popularitySort.bind(this);
    this.relevanceSort = this.relevanceSort.bind(this);
    this.lastDayFilter = this.lastDayFilter.bind(this);
    this.last2DaysFilter = this.last2DaysFilter.bind(this);
    this.lastWeekFilter = this.lastWeekFilter.bind(this);
  }

  search(event) {
    event.preventDefault();
    this.state.terms = event.target.searchBox.value;
    this.state.page = 1;
    this.state.type = "artist";
    fetch("/api/artists/getArtistByName/" + this.state.terms, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((results) => {
      if (!results.ok) {
        this.setState(
          {
            dne: true,
          },
          () => this.forceUpdate()
        );
      }
      return results.json();
    });
    this.forceUpdate();
  }

  dateSort() {
    this.setState(
      {
        sort: "date",
      },
      () => this.forceUpdate()
    );
  }

  popularitySort() {
    this.setState(
      {
        sort: "popularity",
      },
      () => this.forceUpdate()
    );
  }

  relevanceSort() {
    this.setState(
      {
        sort: "relevance",
      },
      () => this.forceUpdate()
    );
  }

  lastDayFilter() {
    this.setState(
      {
        filter: "24h",
      },
      () => this.forceUpdate()
    );
  }

  last2DaysFilter() {
    this.setState(
      {
        filter: "48h",
      },
      () => this.forceUpdate()
    );
  }

  lastWeekFilter() {
    this.setState(
      {
        filter: "7d",
      },
      () => this.forceUpdate()
    );
  }

  sourceFilter() {
    return null;
  }

  pageUp(event) {
    event.preventDefault();
    if (this.state.page < 50) {
      this.state.page = this.state.page + 1;
    }
    this.forceUpdate();
  }

  pageDown(event) {
    event.preventDefault();
    if (this.state.page > 1) {
      this.state.page = this.state.page - 1;
    }
    this.forceUpdate();
  }

  render() {
    var redirect = <p></p>;
    if (this.state.dne) {
      redirect = <Redirect to="/artistdne" />;
    }
    return (
      <div>
        {redirect}
        <h1 style={{ marginLeft: 20 }}>News</h1>

        <Form id="form" style={{ marginLeft: 20 }} onSubmit={this.search}>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  id="search"
                  name="searchBox"
                  placeholder="Search News"
                  style={{ fontSize: 14 }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                id="searchSubmit"
                variant="primary"
                type="submit"
                style={{ fontSize: 14 }}
              >
                Go
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <div style={{ marginLeft: 20, marginBottom: 10 }}>
          <Dropdown style={{ display: "inline-block" }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort By:
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={this.dateSort}>Date</Dropdown.Item>
              <Dropdown.Item onSelect={this.relevanceSort}>
                Relevance
              </Dropdown.Item>
              <Dropdown.Item onSelect={this.popularitySort}>
                Popularity
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ display: "inline-block", marginLeft: 5 }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter By:
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={this.lastDayFilter}>
                Last 24 Hours
              </Dropdown.Item>
              <Dropdown.Item onSelect={this.last2DaysFilter}>
                Last 48 Hours
              </Dropdown.Item>
              <Dropdown.Item onSelect={this.lastWeekFilter}>
                Last Week
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <NewsGrid
          terms={this.state.terms}
          page={this.state.page}
          type={this.state.type}
          sort={this.state.sort}
          filter={this.state.filter}
        />
        <div style={{ marginLeft: 20 }}>
          <Button style={{ display: "inline-block" }} onClick={this.pageDown}>
            Previous Page
          </Button>
          <p style={{ margin: 20, display: "inline-block" }}>
            Page {this.state.page}
          </p>
          <Button style={{ display: "inline-block" }} onClick={this.pageUp}>
            Next Page
          </Button>
        </div>
      </div>
    );
  }
}

export default NewsContainer;
