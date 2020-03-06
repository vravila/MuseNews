import React, {Component} from 'react';

import NewsArticle from './NewsArticle.js';
import './../App.css';

class NewsGrid extends Component{


    state = {
        articles: [
            {key: 1, title: 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner', preview: 'He likes when you get mardy'},
            {key: 2, title: 'Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson', preview: "I don’t know if he knows how successful it is…"},
            {key: 3, title: 'Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)', preview: "What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts"}
        ]
    };

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
