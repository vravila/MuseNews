var fetch = require("isomorphic-fetch")


var request = require('request'); // "Request" library


const getNews = async(q) => {

  let apikey = "bc2ebdb795c5488bb34601ca89a75e7f"
  let requestURL = "http://newsapi.org/v2/everything?q=" + q + "&apiKey=" + apikey;
  const resp =  fetch(requestURL).then(
    response=>response.json()).then(
      data=> {
        console.log(data);
      }
    )
  console.log(resp);
  //console.log(resp.json());
}

getNews("eilish");
