import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const fetchItems = async () => {
    const data = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/commits?per_page=100`
    );

    const issueData = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/issues?state=all`
    );

    // console.log(process.env.REACT_APP_LASTFM_API_KEY);
    const items = await data.json();
    const issuesItems = await issueData.json();

    console.log(items);
    setItems(items);
    setIssuesItems(issuesItems);
  };

  return (
    <div>
      <h1>Welcome to Muse News!</h1>
      <b>What is it?</b>
      <p>
        This is Muse News, your one-stop destination for all things music
        related. Want to know the top songs right now? Learn more about your
        favorite artists? Or even have access to the hottest news? Muse-News
        does all of this. For all you music nerds out there, come to Muse-News
        and have an amazing time.
      </p>
      <br></br>
      <b>What can our website provide?</b>
      <p>Our website allows the user 3 functionalities at the moment:</p>
      <ul>
        <li>The user is able to see the top songs trending right now.</li>
        <li>The user is able to see some news regarding some artists.</li>
        <li>The user is able to see information about some artists.</li>
      </ul>
      <br></br>

      <b>Our Team</b>

      <div class="container">
        <div class="row">
          <div class="card">
            <img src={ravilaImg} style={{ width: "17rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Venkata Ravila</h3>
            </div>
          </div>
          <div class="card">
            <img src={ramanImg} style={{ width: "17rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Kedar Raman</h3>
            </div>
          </div>
          <div class="card">
            <img src={tekleImg} style={{ width: "17rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Alexander Tekle</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card">
            <img src={danielImg} style={{ width: "17rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Daniel Walsh</h3>
            </div>
          </div>
          <div class="card">
            <img src={samImg} style={{ width: "17rem", height: "17rem" }} />
            <div class="card-body">
              <h3 class="card-title">Sam Dauenbaugh</h3>
            </div>
          </div>
        </div>
      </div>

      <h2>Total Number of Commits: {items.length}</h2>
      <h3>Commits Per Person:</h3>
      {parseItems(items).map(item => (
        <p>{item}</p>
      ))}
      <h2>Total Number of Issues: {issuesItems.length}</h2>
      <h3>Issues Per Person:</h3>
      {parseIssues(issuesItems).map(item => (
        <p>{item}</p>
      ))}
      <h2>Total Number of Unit Tests: 0 </h2>
      <h3>Unit Tests Per Person:</h3>
      <p>Kedar Raman: 0</p>
      <p>Venkata Ravila: 0</p>
      <p>Alexander Tekle: 0</p>
      <p>Sam Dauenbaugh: 0</p>
      <p>Daniel Walsh: 0</p>
    </div>
    // <div>
    //   <h1>Artists Page!!!</h1>
    //   <h4>Drake</h4>
    //   <h4>The Weeknd</h4>
    //   <h4>Coldplay</h4>
    // </div>
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
    // console.log(item.commit.author.email);
  }
  console.log("---------------");

  var mapToStr = [];
  for (let person of nameMap.keys()) {
    // if (person === "36828975+vravila@users.noreply.github.com") {
    //   person = "venkataravila@gmail.com";
    // }
    console.log(person + nameMap.get(person));
    mapToStr.push(person + " : " + nameMap.get(person));
  }
  return mapToStr;
}

function parseItems(items) {
  //   items.forEach(parseItemsHelper);
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
    if (nameMap.has(person)) {
      nameMap.set(person, nameMap.get(person) + 1);
    } else {
      nameMap.set(person, 1);
    }
    // console.log(item.commit.author.email);
  }
  //   console.log("---------------");

  var mapToStr = [];
  for (let person of nameMap.keys()) {
    // if (person === "36828975+vravila@users.noreply.github.com") {
    //   person = "venkataravila@gmail.com";
    // }
    // console.log(person + nameMap.get(person));
    mapToStr.push(person + " : " + nameMap.get(person));
  }
  return mapToStr;
}

function parseItemsHelper(item) {
  console.log(item.sha);
}

// function About() {

//     const[name, setName] = useState('');
//     const[login, setUsername] = useState('');
//     const[followers, setFollowers] = useState('');
//     const[following, setFollowing] = useState('');
//     const[public_repos, setRepos] = useState('');
//     const[avatar_url, setAvatar] = useState('');

//     useEffect(() => {
//         fetch("https://api.github.com/users/vravila")
//             .then(res => res.json())
//             .then(data => {
//                 setData(data);
//             });
//     }, []);

//     const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
//         setName(name);
//         setUsername(login);
//         setFollowers(followers);
//         setFollowing(following);
//         setRepos(public_repos);
//         setAvatar(avatar_url);
//     }

//     return(
//         <div>
//             <a>The name is {name}</a>
//             <p>The login is {login}</p>
//             <p>The followers is {followers}</p>
//             <p>The following is {following}</p>
//             <p>The repo is {public_repos}</p>
//             <p>The avatar is {avatar_url}</p>
//         </div>
//     );

// }

export default About;

// import React, {useEffect, useState} from 'react';

// function About() {

//     const[name, setName] = useState('');
//     const[login, setUsername] = useState('');
//     const[followers, setFollowers] = useState('');
//     const[following, setFollowing] = useState('');
//     const[public_repos, setRepos] = useState('');
//     const[avatar_url, setAvatar] = useState('');

//     useEffect(() => {
//         fetch("https://api.github.com/users/vravila")
//             .then(res => res.json())
//             .then(data => {
//                 setData(data);
//             });
//     }, []);

//     const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
//         setName(name);
//         setUsername(login);
//         setFollowers(followers);
//         setFollowing(following);
//         setRepos(public_repos);
//         setAvatar(avatar_url);
//     }

//     return(
//         <div>
//             <a>The name is {name}</a>
//             <p>The login is {login}</p>
//             <p>The followers is {followers}</p>
//             <p>The following is {following}</p>
//             <p>The repo is {public_repos}</p>
//             <p>The avatar is {avatar_url}</p>
//         </div>
//     );

// }

// export default About;
