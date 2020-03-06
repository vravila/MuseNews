import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './../App.css';
import { Link } from "react-router-dom";

class NewsArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.id,
            title: this.props.title,
            image: require("./../newsImage.jpg"),
            previewText: this.props.preview
        };
    }

    render(){
        return(
            <div>
                <body>
                    <Card style={{width: '32rem', fontSize: 14}}>
                        <Card.Img variant="top" src={this.state.image} />
                        <Card.Body>
                            <Card.Title ><h3>{this.state.title}</h3></Card.Title>
                            <Card.Text> 
                                {this.state.previewText}
                            </Card.Text>
                            <Link to={`/Newsp/${this.state.key}`}>
                                <Button variant="primary" style={{fontSize: 14}}>More</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </body>
            </div>
        )
    }
}

export default NewsArticle;