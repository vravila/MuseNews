var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: "r0cNjq1UbABQJUwGumA10eSOV",
  consumer_secret: "VkWntyt2QYkphjnQrlebjTb3dic6sr7Rt8GjU76qWB5n6412EU",
  access_token_key: "1230301995833098240-g69SboEJvrkVfOgoS9Nx58WviZUhCu",
  access_token_secret: "xXyX0hIiP3CXKdiHW5MAREfnUskmi4Q2bXLAhjdAPr1Al",
});

function getTweets() {
  return new Promise(function (resolve, reject) {
    client.get("search/tweets", { q: "The Weeknd", count: 5 }, function (
      error,
      tweets,
      response
    ) {
      resolve(tweets);
    });
  });
}

function convertToHtml(url) {
  return new Promise(function (resolve, reject) {
    client.get("statuses/oembed", { url: url }, function (error, response) {
      resolve(response.html);
    });
  });
}
module.exports = function () {
  return new Promise(function (resolve, reject) {
    getTweets().then(function (tweets) {
      const urls = new Array(5);

      for (var i = 0; i < 5; i++) {
        var id = tweets.statuses[i].id_str;
        var user = tweets.statuses[i].user.screen_name;
        var url = "http://twitter.com/" + user + "/status/" + id;
        urls[i] = url;
      }

      const promises = urls.map((url) => convertToHtml(url));
      Promise.all(promises).then((data) => {
        resolve(data);
      });
    });
  });
};
