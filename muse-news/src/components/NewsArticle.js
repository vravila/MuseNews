import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./../App.css";
import { Link } from "react-router-dom";

class NewsArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      title: this.props.title,
      img: this.props.img,
      previewText: this.props.preview,
    };
  }

  componentDidUpdate(){
    if(this.state.title !== this.props.title){
      this.setState({
        link: this.props.link,
        title: this.props.title,
        previewText: this.props.preview,
        img: this.props.img
      });
    }
  }

  render() {
    return (
      <div>
        <Card style={{ width: "32rem", fontSize: 14 }}>
          <Card.Img variant="top" src={this.state.img} width="318" height="190" />
          <Card.Body>
            <Card.Title>
              <h3>{this.state.title}</h3>
            </Card.Title>
            <Card.Text>{this.state.previewText}</Card.Text>
            <Link to={`/Newsp/${this.state.link}`}>
              <Button variant="primary" style={{ fontSize: 14 }}>
                More
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default NewsArticle;
