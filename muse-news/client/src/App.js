import React, { Component } from "react";
import Navbar from "./components/Navbar";
import About from "./components/pages/About";
import Artists from "./components/pages/Artists";
import Home from "./components/pages/Home";
import HomeSearch from "./components/pages/HomeSearch";
import News from "./components/pages/News";
import Songs from "./components/pages/Songs";
import SongsPage from "./components/pages/SongsPage";
import NewsPage from "./components/pages/NewsPage";
import RedirectArtistsPages from "./components/pages/RedirectArtistsPages";
import RedirectSongsPages from "./components/pages/RedirectSongsPages";
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
          <Route
            path="/artists/:mode/:searchterms/:sort/:ontour/:minPlayCount/:maxPlayCount/:minListeners/:maxListeners/:page"
            component={Artists}
          />
          <Route path="/artistspage/:id" component={ArtistsPage} />
          <Route path="/news" component={News} />
          <Route path="/newsa/:artist" component={News} />
          <Route
            path="/songs/:mode/:searchterms/:sort/:artistSearch/:minPlayCount/:maxPlayCount/:minListeners/:maxListeners/:minRank/:maxRank/:page"
            component={Songs}
          />
          <Route path="/songspage/:song/:artist" component={SongsPage} />
          <Route
            path="/redirectArtistsPages"
            component={RedirectArtistsPages}
          />
          <Route path="/homeSearch" component={HomeSearch} />
          <Route path="/redirectSongsPages" component={RedirectSongsPages} />
          <Route path="/artistdne" component={ArtistDNE} />
          <Route path="/newsp/:terms/:index" component={NewsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
