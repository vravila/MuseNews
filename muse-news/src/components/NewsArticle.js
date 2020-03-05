import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './../App.css';

class NewsArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            image: require("./../newsImage.jpg"),
            previewText: this.props.preview
        };
        this.viewArticle = this.viewArticle.bind(this);
    }
    viewArticle(){
        this.setState(state => ({
            previewText: 'Boom'
        }))
    }
    render(){
        return(
            <div>
                <body>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={this.state.image} />
                        <Card.Body>
                            <Card.Title>{this.state.title}</Card.Title>
                            <Card.Text> 
                                {this.state.previewText}
                            </Card.Text>
                            <Button variant="primary" onClick={this.viewArticle}>More</Button>
                        </Card.Body>
                    </Card>
                </body>
            </div>
        )
    }
}

export default NewsArticle;