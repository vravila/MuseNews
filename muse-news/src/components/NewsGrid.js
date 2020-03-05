import React, {Component} from 'react';

import NewsArticle from './NewsArticle.js';
import './../App.css';

class NewsGrid extends Component{

    state = {
        articles: [
            {id: 1, title: 'Title One', preview: "This is a preview one"},
            {id: 2, title: 'Title Two', preview: "This is a preview two"},
            {id: 3, title: 'Title Three', preview: "This is a preview three"}
        ]
    };
    
    render(){
        const stories = this.state.articles.map(article=> 
            <NewsArticle key={article.id} title={article.title} preview={article.preview} />);
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
        )
    }
}

export default NewsGrid;