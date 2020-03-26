import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import NewsGrid from './NewsGrid';

class NewsContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            terms: "Music",
            page: 1,
            filter: "None",
            sort: "None"
        };
        this.search = this.search.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
    }

    search(event){
        event.preventDefault();
        this.state.terms = event.target.searchBox.value;
        this.state.page = 1;
        this.forceUpdate();
    }
    pageUp(event){
        event.preventDefault();
        if(this.state.page < 50){
            this.state.page = this.state.page + 1;
        }
        this.forceUpdate();
    }
    pageDown(event){
        event.preventDefault();
        if(this.state.page > 1){
            this.state.page = this.state.page - 1;
        }
        this.forceUpdate();
    }

    /* TODO
     * NewsGrid updates its entries based on search terms 
     */
    render(){
        return(
            <div>
                <h1 style = {{ marginLeft: 20 }}>News</h1>

                <Form style = {{ marginLeft: 20 }} onSubmit={this.search}>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Control name="searchBox" placeholder="Search News" style={{ fontSize: 14 }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit" style={{ fontSize: 14 }}>Go</Button>
                        </Col>
                    </Form.Row>
                </Form>

                <NewsGrid terms={this.state.terms} page={this.state.page} />
                <div style = {{marginLeft: 20}}>
                    <Button style={{display: 'inline-block'}} onClick={this.pageDown}>Previous Page</Button>
                    <p style={{margin: 20, display: 'inline-block'}}>Page {this.state.page}</p>
                    <Button style={{display: 'inline-block'}} onClick={this.pageUp}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default NewsContainer;