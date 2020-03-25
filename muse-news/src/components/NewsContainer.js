import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import NewsGrid from './NewsGrid';

class NewsContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            terms: "",
            filter: "None",
            sort: "None"
        };
        this.search = this.search.bind(this);
    }

    search(event){
        event.preventDefault();
        this.state.terms = event.target.searchBox.value;
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

                <NewsGrid terms={this.state.terms} />
            </div>
        );
    }
}

export default NewsContainer;