import React, {Component} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import NewsArticle from './NewsArticle.js';
import './../App.css';

const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

// TODO figure out how this works (Maybe talk to Alex?)
//const [eilishNews, setEilishNews] = useState([]);
//let eilish;
/*
const getNews = async(q) => {


  let apikey = "bc2ebdb795c5488bb34601ca89a75e7f"
  let requestURL = "http://newsapi.org/v2/everything?q=" + q + "&apiKey=" + apikey;
  const resp =  fetch(requestURL).then(
    response=>response.json()).then(
      data=> {
        console.log(data);
        //setEilishNews(data);
      }
    )
  //console.log(eilishNews);
  //console.log(resp.json());
}*/
class NewsGrid extends Component{

    constructor(props){
        super(props);
        this.state = {
            terms: this.props.terms,
            articles: [
                //{key: 1, title: 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner', preview: 'He likes when you get mardy'},
                {key: 1, title: 'ERROR', preview: 'Something went wrong'},
                {key: 2, title: 'ERROR', preview: 'Something went wrong'},
                {key: 3, title: 'ERROR', preview: 'Something went wrong'}
            ]
        }
        this.getNews(this.state.terms);
        this.forceUpdate();
    }

    getNews(q){
        let apikey = "bc2ebdb795c5488bb34601ca89a75e7f"
        let requestURL = "http://newsapi.org/v2/everything?q=" + q + "&apiKey=" + apikey;
        var outData = "Empty";
        const resp =  fetch(requestURL).then(
            response=>{
                return response.json();
            }).then(
            data=> {
                console.log(data);
                var newArticles = []
                for(var i = 0; i < 3; i++){
                    newArticles.push({key: i+1, title: data.articles[i].title, preview: data.articles[i].description});
                }
                this.setState({articles: newArticles}, () => this.forceUpdate());
            }

        );
        console.log(this.state);
    }

    componentDidUpdate(){
        if(this.state.terms !== this.props.terms){
            this.setState({terms: this.props.terms}, () => this.getNews(this.state.terms));
        }
    }

    // TODO change this to show more cards instead of a hardcoded table
    render(){
        console.log(this.state.articles[0].title);
        console.log(this.state.articles[0]);
        console.log(this.state.articles);
        var stories = this.state.articles.map(article=>
            <NewsArticle key={article.key} title={article.title} preview={article.preview} />);
        var disp = React.Children.toArray(stories);
        return(
            <div style={{marginLeft:20}}>
                <h4>Search terms = {this.state.terms}</h4>
                <Row>
                    <Col>
                        {disp[0]}
                    </Col>
                    <Col>
                        {disp[1]}
                    </Col>
                    <Col>
                        {disp[2]}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default NewsGrid;
