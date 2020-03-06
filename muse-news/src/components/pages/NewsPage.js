import React from 'react';
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Article from './../Article';

function updateState(key){
    if(key === '1'){
        var title = 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner';
        var text = 'He likes when you get mardy';
        var url = 'https://www.nme.com/news/music/billie-eilish-bad-guy-alex-turner-style-2619882?amp';
    }else if(key === '2'){
        title = "Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson";
        text = "I don’t know if he knows how successful it is…";
        url = "https://www.nme.com/news/music/tame-impala-kevin-parker-the-less-i-know-the-better-to-mark-ronson-2599062";
    }else{
        title = "Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)";
        text = "What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts";
        url = "https://variety.com/2020/music/news/the-weeknd-blinding-lights-behind-the-scenes-video-exclusive-1203518570/";
    }
    return({title, text, url});
}

function NewsPage(){

    let {key} = useParams();
    var {title, text, url} = updateState(key);
    return (
        <div>
            <body>
                <div style={{margin:20}}>
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <a href={url}>Source</a>
                </div>
            </body>
        </div>
    );
}

export default NewsPage;