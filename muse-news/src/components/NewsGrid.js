import React, {Component, useEffect, useState} from 'react';

import NewsArticle from './NewsArticle.js';
import './../App.css';

const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

// TODO figure out how this works (Maybe talk to Alex?)
//const [eilishNews, setEilishNews] = useState([]);
//let eilish;
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
}
class NewsGrid extends Component{

    // TODO update this to show entries based on a search term instead of hardcoded entries.
    state = {
        articles: [
            {key: 1, title: 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner', preview: 'He likes when you get mardy'},
            {key: 2, title: 'Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson', preview: "I don’t know if he knows how successful it is…"},
            {key: 3, title: 'Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)', preview: "What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts"}
        ]
    };

    // TODO change this to show more cards instead of a hardcoded table
    render(){
        const stories = this.state.articles.map(article=>
            <NewsArticle key={article.key} title={article.title} preview={article.preview} />);
        const disp = React.Children.toArray(stories);
        return(
            <div style={{marginLeft:20}}>
                <body>
                    <h1>News</h1>
                    <br></br>
                    <table>
                        <tr>
                            <td>
                                {disp[0]}
                            </td>
                            <td>
                                {disp[1]}
                            </td>
                            <td>
                                {disp[2]}
                            </td>
                        </tr>
                    </table>
                </body>
            </div>
        );
    }
}
export default NewsGrid;
