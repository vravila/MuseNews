import React, {Component} from 'react';

class Article extends Component {
    state = {
        title: "Sample Title",
        text: "Sample Text",
        url: "www.google.com",
        image: require("./../newsImage.jpg")
    }
    render() { 
        return (
            <div>
                <body>
                    <div style={{margin:20}}>
                        <img src={this.state.image} />
                        <h1>{this.state.title}</h1>
                        <p>{this.state.text}</p>
                    </div>
                    <a url={this.state.url} />
                </body>
            </div>
        );
    }
}
 
export default Article;