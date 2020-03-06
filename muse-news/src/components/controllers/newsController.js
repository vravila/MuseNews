const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

//gets news on Post Maloen
//module.exports = function(artist) {

  var titles = new Array(3);
  var urls = new Array(3);
  var dates = new Array(3);

  const data = googleNews
     .search('Democrats')
     .then(resp => {

       console.log(resp);

       for (var i=0; i<3; i++) {

         console.log(resp[i].thumbnailUrl)
         /*
         titles[i] = resp[i].title;
         urls[i] = resp[i].link;
         dates[i] = resp[i].pubDate;
         */
       }
     });


   var articles = new Map();

   articles.set("articleTitles", titles)
   articles.set("articleURLS", urls)
   articles.set("articleDates", dates)

   return articles

//}
