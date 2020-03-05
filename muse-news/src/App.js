import React, { Component } from "react";
import Navbar from "./components/Navbar";
import About from "./components/pages/About";
import Artists from "./components/pages/Artists";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Songs from "./components/pages/Songs";
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
          <Route path="/artists" exact component={Artists} />
          <Route path="/artists/:id" component={ArtistsPage} />
          <Route path="/news" component={News} />
          <Route path="/songs" component={Songs} />
        </Switch>
      </div>
    );
  }
}

export default App;
