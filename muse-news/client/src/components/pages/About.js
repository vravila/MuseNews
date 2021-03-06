import React, { useEffect, useState } from "react";

function About() {
  useEffect(() => {
    fetchItems();
  }, []);

  const tekleImg = require("./../../imgs/AlexanderTekle.jpg");
  const ramanImg = require("./../../imgs/KedarRaman.jpg");
  const ravilaImg = require("./../../imgs/VenkataRavila.jpg");
  const danielImg = require("./../../imgs/DanielWalsh.jpg");
  const samImg = require("./../../imgs/SamDauenbaugh.jpg");

  const [items, setItems] = useState([]);
  const [issuesItems, setIssuesItems] = useState({});
  const [secondItems, setSecondItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/commits?page=1&per_page=100`
    );

    const secondData = await fetch(
      "https://api.github.com/repos/vravila/MuseNews/commits?page=2&per_page=100"
    );

    const issueData = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/issues?state=all`
    );

    const items = await data.json();
    const secondItems = await secondData.json();
    const issuesItems = await issueData.json();

    console.log(items);
    setItems(items);
    setIssuesItems(issuesItems);
    setSecondItems(secondItems);
  };

  return (
    <div>
      <h1>Welcome to Muse News!</h1>
      <b>What is it?</b>
      <p>
        This is Muse News, your one-stop destination for all things music
        related. Want to know the top songs right now? Learn more about your
        favorite artists? Or even have access to the hottest news about songs
        and artists? Muse-News does all of this. Whether you are a music nerd
        looking for the latest updates on your favorite artists or a casual
        listener exploring songs and artists, everyone can come to Muse-News and
        learn more about the latest artists, songs, and news in the music
        industry.
      </p>
      <br></br>
      <b>What can our website provide?</b>
      <p>Our website allows the user 3 functionalities at the moment:</p>
      <ul>
        <li>The user is able to see the top songs trending right now.</li>
        <li>
          The user is able to see the latest news regarding artists and songs.
        </li>
        <li>
          The user is able to see the top artists on the charts right now.
        </li>
      </ul>
      <p>
        Muse-News brings all of this information together in an interconnected
        format. We integrate songs, artists, and the latest news about each to
        provide users with easy access to their favorite artists and songs and
        the news related to this. Links between songs, artists, and news
        articles are one click away, meaning users can browse through each
        category and explore related information in other categories!
      </p>
      <br></br>

      <b>Team Muse-News</b>

      <div class="container">
        <div class="row">
          <div class="card" style={{ width: "25rem", height: "40rem" }}>
            <img src={ravilaImg} style={{ width: "25rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Venkata Ravila</h3>
              <h6>
                <strong>
                  Electrical and Computer Engineering- Software Engineering
                </strong>
              </h6>
              <p>
                Venkata is a junior Computer Engineering student at UT. He is
                passionate about cloud computing and front-end web development.
                In his free time, he likes to play video games and sports.
              </p>
              <p>
                <strong>Primary Responsibilities:</strong> Full-stack
                development of Home and About pages
              </p>
            </div>
          </div>
          <div class="card" style={{ width: "25rem", height: "40rem" }}>
            <img src={ramanImg} style={{ width: "25rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Kedar Raman</h3>
              <h6>
                <strong>
                  Electrical and Computer Engineering- Software Engineering
                </strong>
              </h6>
              <p>
                Kedar is a junior Computer Engineering student at UT. He is
                passionate about cloud computing, the Internet of Things, and
                autonomous vehicles. In his free time, he likes to play sports,
                go hiking, and explore the unique food that Austin has to offer.
              </p>
              <p>
                <strong>Primary Responsibilities:</strong> Full-Stack
                development of Artists pages, Back-End Node.JS API development,
                Selenium & Mocha tests
              </p>
            </div>
          </div>
          <div class="card" style={{ width: "25rem", height: "40rem" }}>
            <img src={tekleImg} style={{ width: "25rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Alexander Tekle</h3>
              <h6>
                <strong>
                  Electrical and Computer Engineering- Software Engineering
                </strong>
              </h6>
              <p>
                Alex Tekle is a third year Computer Engineering and Math student
                at UT Austin. He’s interested in software engineering,
                particularly data science and neural networks. In his free time,
                he likes to play basketball and watch soccer.
              </p>
              <p>
                <strong>Primary Responsibilities:</strong> Back-End development,
                integration with APIs, Navigation bar search functionality
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card" style={{ width: "25rem", height: "40rem" }}>
            <img src={danielImg} style={{ width: "25rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Daniel Walsh</h3>
              <h6>
                <strong>
                  Electrical and Computer Engineering- Software Engineering and
                  Communications
                </strong>
              </h6>
              <p>
                Daniel is a third year Computer Engineering student at UT
                Austin. He’s interested in real-time digital signal processing
                and compression algorithms. In his free time, he likes to play
                video games and bike.
              </p>
              <p>
                <strong>Primary Responsibilities:</strong> Full-Stack
                development of Songs pages
              </p>
            </div>
          </div>
          <div class="card" style={{ width: "25rem", height: "40rem" }}>
            <img src={samImg} style={{ width: "25rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Sam Dauenbaugh</h3>
              <h6>
                <strong>
                  Electrical and Computer Engineering- Software Engineering and
                  Digital Signal Processing
                </strong>
              </h6>
              <p>
                Sam is a third year Computer Engineering student at UT Austin.
                He’s interested in communication and automation. In his free
                time, he likes to play video games and go hiking.
              </p>
              <p>
                <strong>Primary Responsibilities:</strong> Full-Stack
                development of News pages, integration with APIs
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Data Sources</h3>
      <p>
        <strong>LastFM API: </strong> Scraped using NodeJS to
        http://ws.audioscrobbler.com/2.0. We used the getInfo endpoint for
        tracks and artists and the getTopSongs method for artists to find their
        top songs. We used this API to get biographical information on artists
        and songs for each instance.
      </p>
      <p>
        <strong>Google News API: </strong> Scraped using Node.JS to
        http://newsapi.org/v2/everything. We used this API to get news articles
        for songs and artists. We display a preview of the article along with a
        link to the article and other information such as publication date and
        author.
      </p>
      <p>
        <strong>Twitter API: </strong> Scraped using Node.JS to
        http://twitter.com/. The Twitter API provides access to several of
        Twitter’s core features. We implemented querying an artist or song name
        through the Twitter API to find and display relevant tweets.
      </p>
      <p>
        <strong>Bing Images API: </strong> Scraped using Node.JS to
        https://api.cognitive.microsoft.com/bing/v7.0/images. We used this API
        to get images for each instance of the Song and Artist models.
      </p>
      <p>
        <strong>Git API: </strong> Scraped using a FETCH request to
        https://api.github.com. We use this API to dynamically get GitHub
        statistics like commits and issues for the project as a whole and per
        user.
      </p>

      <h3>Tools</h3>
      <p>
        <strong>React.JS: </strong> We used React.JS to develop the front-end of
        the application. This allowed us to create a visually-appealing
        application. We also used the React framework for some API calls that we
        didn't use Node.JS for.
      </p>

      <p>
        <strong>Node.JS: </strong> We used Node.JS to develop some back-end code
        of the application. It was used for API calls to get data about songs,
        artists, and news. We created endpoints for our server that our
        front-end would use to interact with our MongoDB database. This easily
        separated the front-end and back-end.
      </p>

      <p>
        <strong>Express.JS: </strong> We used the Express.JS framework to format
        how we set up Node.JS calls. This consisted of having a routes folder
        with all of the endpoints, among other schemas.
      </p>

      <p>
        <strong>MongoDB: </strong> We used MongoDB to store the data for our
        website. We store all instances of songs and artists in the 'songs' and
        'artists' collections of our MongoDB database. We store many instances
        of news articles in the 'news' collection of our MongoDB database.
      </p>

      <p>
        <strong>Bootstrap: </strong> We used Bootstrap to format our web
        application and make it visually-appealing.
      </p>

      <h3>
        Link to Github Repo:{" "}
        <a href="https://github.com/vravila/MuseNews">
          https://github.com/vravila/MuseNews
        </a>
      </h3>

      <h3>Total Number of Commits: {items.length + secondItems.length}</h3>
      <h4>Commits Per Person:</h4>
      {parseItems(items, secondItems).map((item) => (
        <p>{item}</p>
      ))}
      <h3>Total Number of Issues: {issuesItems.length}</h3>
      <h4>Issues Per Person:</h4>
      {parseIssues(issuesItems).map((item) => (
        <p>{item}</p>
      ))}
      <h3>Total Number of Unit Tests: 80 </h3>
      <h4>Unit Tests Per Person:</h4>
      <p>Kedar Raman: 30</p>
      <p>Venkata Ravila: 10</p>
      <p>Alexander Tekle: 10</p>
      <p>Sam Dauenbaugh: 10</p>
      <p>Daniel Walsh: 10</p>
    </div>
  );
}

function parseIssues(items) {
  let nameMap = new Map();

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var personArray = item.assignees;
    var person = "";
    for (var j = 0; j < personArray.length; j++) {
      person = personArray[j].login;
      console.log(person);
      if (person === "donuthole55") {
        person = "Daniel Walsh";
      } else if (person === "kedaraman") {
        person = "Kedar Raman";
      } else if (person === "sDauenbaugh") {
        person = "Sam Dauenbaugh";
      } else if (person === "vravila") {
        person = "Venkata Ravila";
      } else if (person === "AlexanderTekle") {
        person = "Alexander Tekle";
      } else {
        person = "Someone Else";
      }

      if (nameMap.has(person)) {
        nameMap.set(person, nameMap.get(person) + 1);
      } else {
        nameMap.set(person, 1);
      }
    }
  }
  console.log("---------------");

  var mapToStr = [];
  for (let person of nameMap.keys()) {
    console.log(person + nameMap.get(person));
    mapToStr.push(person + " : " + nameMap.get(person));
  }
  return mapToStr;
}

function parseItems(items, secondItems) {
  let nameMap = new Map();

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var person = item.commit.author.email;
    if (person === "36828975+vravila@users.noreply.github.com") {
      person = "venkataravila@gmail.com";
    }
    if (person === "36870836+donuthole55@users.noreply.github.com") {
      person = "danwalsh98@gmail.com";
    }
    if (person === "32229316+kedaraman@users.noreply.github.com") {
      person = "kedar.v.raman@gmail.com";
    }
    if (nameMap.has(person)) {
      nameMap.set(person, nameMap.get(person) + 1);
    } else {
      nameMap.set(person, 1);
    }
  }

  for (var i = 0; i < secondItems.length; i++) {
    var item = secondItems[i];
    var person = item.commit.author.email;
    if (person === "36828975+vravila@users.noreply.github.com") {
      person = "venkataravila@gmail.com";
    }
    if (person === "36870836+donuthole55@users.noreply.github.com") {
      person = "danwalsh98@gmail.com";
    }
    if (person === "32229316+kedaraman@users.noreply.github.com") {
      person = "kedar.v.raman@gmail.com";
    }
    if (nameMap.has(person)) {
      nameMap.set(person, nameMap.get(person) + 1);
    } else {
      nameMap.set(person, 1);
    }
  }

  var mapToStr = [];
  for (let person of nameMap.keys()) {
    mapToStr.push(person + " : " + nameMap.get(person));
  }
  return mapToStr;
}

function parseItemsHelper(item) {
  console.log(item.sha);
}

export default About;
