import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Article from './../Article';

function NewsPage(){

    return(
        <div>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossorigin="anonymous"
            />

            <Article />

            </div>
    )

    // const state = useState({
    //     title: "Sample Title",
    //     text: "Sample Text",
    //     url: "www.google.com",
    //     image: require("./../../newsImage.jpg")
    // });
    // return (
    //     <div>
    //         <link
    //             rel="stylesheet"
    //             href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    //             integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    //             crossorigin="anonymous"
    //         />
    //         <body>
    //             <div style={{margin:20}}>
    //                 <img src={state.image} />
    //                 <h1>{state.title}</h1>
    //                 <p>{state.text}</p>
    //             </div>
    //             <a url={state.url} />
    //         </body>
    //     </div>
    // );
}

export default NewsPage;