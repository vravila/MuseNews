import React, {Component} from 'react';

class Article extends Component {
        state = {
            key: this.props.key,
            title: 'Title',
            text: 'text',
            url: 'https://www.google.com'
        }

    updateState(){
        //if(this.state.key === '1'){
            this.state = {
                title: 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner',
                text: 'He likes when you get mardy',
                url: 'https://www.nme.com/news/music/billie-eilish-bad-guy-alex-turner-style-2619882?amp'
            };
        /*else if(this.state.key == 2){
            this.state.title = "";
            this.state.text = "";
            this.state.url = "";
        }else{
            this.state.title = "";
            this.state.text = "";
            this.state.url = "";
        }*/
    }

    render() { 
        this.updateState();
        return (
            <div>
                <body>
                    <div style={{margin:20}}>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.text}</p>
                        <a href={this.state.url}>Source</a>
                    </div>
                </body>
            </div>
        );
    }
}
 
export default Article;