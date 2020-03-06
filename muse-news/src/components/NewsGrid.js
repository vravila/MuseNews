import React, {Component} from 'react';

import NewsArticle from './NewsArticle.js';
import './../App.css';

class NewsGrid extends Component{

    state = {
        articles: [
            {id: 1, title: 'Noah Cyrus Reveals the Billie Eilish Song That Resonates With Her Most: Takeover Tuesday Playlist', preview: "Eilish is one of 15 artists Cyrus shouts out on her playlist.", url: 'https://www.billboard.com/articles/columns/pop/9327253/noah-cyrus-playlist-takeover-tuesday'},
            {id: 2, title: 'Tame Impala’s ‘The Slow Rush’ Is Forgettable At Best', preview: "This is one half of the arts department’s review of Tame Impala’s The Slow Rush. The second article can be found here.", url: 'https://cornellsun.com/2020/03/01/tame-impalas-the-slow-rush-is-forgettable-at-best/'},
            {id: 3, title: 'The Weeknd Gets Dark in New After Hours Short Film — with a Cameo by Jimmy Kimmel!', preview: "The video comes with an epilepsy trigger warning", url: 'https://people.com/music/weeknd-after-hours-short-film-jimmy-kimmel-cameo/'}
        ]
    };
    
    render(){
        const stories = this.state.articles.map(article=> 
            <NewsArticle key={article.id} id={article.id} title={article.title} preview={article.preview} />);
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