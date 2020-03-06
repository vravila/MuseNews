import React, {useEffect, useState} from 'react';



function About() {

    const[name, setName] = useState('');
    const[login, setUsername] = useState('');
    const[followers, setFollowers] = useState('');
    const[following, setFollowing] = useState('');
    const[public_repos, setRepos] = useState('');
    const[avatar_url, setAvatar] = useState('');

    useEffect(() => {
        fetch("https://api.github.com/users/vravila")
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, []);

    const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
        setName(name);
        setUsername(login);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
    }

    return(
        <div>
            <a>The name is {name}</a>
            <p>The login is {login}</p>
            <p>The followers is {followers}</p>
            <p>The following is {following}</p>
            <p>The repo is {public_repos}</p>
            <p>The avatar is {avatar_url}</p>
        </div>
    );

}

export default About;