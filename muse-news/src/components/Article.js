import React, {Component} from 'react';

const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();

class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: this.props.index,
            terms: this.props.terms,
            title: 'Title',
            author: 'Unkown',
            date: '-',
            text: 'text',
            img: './../NewsImage.jpg',
            content: 'empty',
            url: 'https://news.google.com'
        };
        this.getArticle = this.getArticle.bind(this);

        this.getArticle();
    }

    getArticle(){
        var q = this.state.terms;
        var page = Math.floor((this.state.index / 20) + 1);
        let apikey = "bc2ebdb795c5488bb34601ca89a75e7f"
        let requestURL = "http://newsapi.org/v2/everything?q=" + q + "&page=" + page + "&apiKey=" + apikey;
        const resp =  fetch(requestURL).then(
            response=>{
                return response.json();
            }).then(
            data=> {
                console.log(data);
                const k = (this.state.index % 20);
                this.setState({
                    title: data.articles[k].title,
                    author: data.articles[k].author,
                    date: data.articles[k].date,
                    text: data.articles[k].description,
                    img: data.articles[k].urlToImage,
                    content: data.articles[k].content,
                    url: data.articles[k].url
                }, () => this.forceUpdate());
            }

        );
        console.log(this.state);
    }

    render() {
        return (
            <div style={{ margin: 20 }}>
                <h1>{this.state.title}</h1>
                <h3>By: {this.state.author}</h3>
                <h3>Published on: {this.state.date}</h3>
                <p style={{ fontSize: 18 }}>
                    <u>{this.state.text}</u>
                </p>
                <img
                    className="center-block"
                    src={this.state.img}
                    alt=""
                    style={{ width: 500, height: 500 }}
                />
                <br />
                <p className="lead" style={{ fontSize: 16 }}>
                    {this.state.content}
                    <a href={this.state.url}> Read More... </a>
                </p>
                {/*
                <p style={{ fontSize: 14 }}>
                    See more about {artist} <Link to={`/artists/${artist}`}>here</Link>.
                </p>
                <p style={{ fontSize: 14 }}>
                    See more about {song}{" "}
                    <Link to={`/songspage/${artist}/${song}`}>here</Link>.
                </p>
                */}
            </div>
        );
    }
}
 
export default Article;