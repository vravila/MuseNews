import React, { Component } from "react";
import Navbar from "./components/Navbar";
import About from "./components/pages/About";
import Artists from "./components/pages/Artists";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Songs from "./components/pages/Songs";
import SongsPage from "./components/pages/SongsPage";
import NewsPage from "./components/pages/NewsPage";
import RedirectPages from "./components/pages/RedirectPages";
import ArtistDNE from "./components/pages/ArtistDNE";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route } from "react-router-dom";
import ArtistsPage from "./components/pages/ArtistsPage";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/artists/:page" component={Artists} />
          <Route path="/artistspage/:id" component={ArtistsPage} />
          <Route path="/news" component={News} />
          <Route path="/newsa/:artist" component={News} />
          <Route path="/songs/:page" component={Songs} />
          <Route path="/songspage/:song/:artist" component={SongsPage} />
          <Route
            path="/redirectPages/:source/:page"
            component={RedirectPages}
          />
<<<<<<< HEAD
          <Route path="/artistdne" component={ArtistDNE} />
=======
          <Route path="/newsp/:terms/:index" component={NewsPage} />
>>>>>>> newsPage
        </Switch>
      </div>
    );
  }
}

export default App;
