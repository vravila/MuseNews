import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [issuesItems, setIssuesItems] = useState({});

  const fetchItems = async () => {
    const data = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/commits?all=true`
    );

    const issueData = await fetch(
      `https://api.github.com/repos/vravila/MuseNews/issues`
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
