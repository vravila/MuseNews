import React from 'react';
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function updateState(title){
    var text,author, date, url,artist,song;
    if(title === 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner'){
        //title = 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner';
        text = 'He likes when you get mardy';
        author = 'Matthew Neale';
        date = '3rd March 2020';
        url = 'https://www.nme.com/news/music/billie-eilish-bad-guy-alex-turner-style-2619882?amp';
        artist = "Billie Eilish";
        song = "Bad Guy";
    }else if(title === 'Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson'){
        //title = "Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson";
        text = "I don’t know if he knows how successful it is…";
        author = 'Patrick Clarke';
        date = '20th January 2020';
        url = "https://www.nme.com/news/music/tame-impala-kevin-parker-the-less-i-know-the-better-to-mark-ronson-2599062";
        artist = "Tame Impala";
        song = "The less I know the better";
    }else{
        //title = "Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)";
        text = "What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts";
        author = 'Jem Aswad';
        date = '28th February 2020';
        url = "https://variety.com/2020/music/news/the-weeknd-blinding-lights-behind-the-scenes-video-exclusive-1203518570/";
        artist = "the weeknd";
        song = "Blinding Lights";
    }
    return({text, author, date, url, artist, song});
}

function NewsPage(){

    let {title} = useParams();
    var {text, author, date, url, artist, song} = updateState(title);
    return (
        <div>
            <body>
                <div style={{margin:20}}>
                    <h1>{title}</h1>
                    <h3>By: {author}</h3>
                    <h3>{date}</h3>
                    <p style={{fontSize:18}}>{text}</p>
                    <br/>
                    <p style={{fontSize:16}}>Read the article <a href={url}>here</a>.</p>
                    <p style={{fontSize:16}}>See more about the artist <Link to={`/artists/${artist}`}>here</Link>.</p>
                    <p style={{fontSize:16}}>See more about the song <Link to={`/songspage/${artist}/${song}`}>here</Link>.</p>
                </div>
            </body>
        </div>
    );
}

export default NewsPage;