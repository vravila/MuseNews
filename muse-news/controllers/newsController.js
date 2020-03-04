const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

//gets news on Post Maloen
module.exports = function(app) {
  googleNews
     .search('Post Malone')
     .then(resp => console.log(resp));
}
