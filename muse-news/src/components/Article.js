import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Article extends Component {
    state = {
        key: this.props.key,
        title: "Title",
        text: "Sample Text",
        url: "www.google.com"
    }

    render() { 
        return (
            <div>
                <body>
                    <div style={{margin:20}}>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.text}</p>
                        <Link to={this.state.url}>Source</Link>
                    </div>
                </body>
            </div>
        );
    }
}
 
export default Article;