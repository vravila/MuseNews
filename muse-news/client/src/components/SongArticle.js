import React, {Component} from 'react';

class SongArticle extends Component {
    state = {
        title: this.props.song,
        artist: this.props.name,
        image: this.props.img
    }
    render() { 
        return (
           <div>
            <div class="container-fluid">
                <h1>taco</h1>
                <h2>By </h2>
            </div>
           </div>
        );
    }
}
 
export default SongArticle;