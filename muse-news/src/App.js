import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import ArtistsPage from "./components/ArtistsPage";
import ArtistDetail from "./components/ArtistDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />

        <Navigation />
        <Switch>
          <Route path="/artists" exact component={ArtistsPage} />
          <Route path="/artists/:id" component={ArtistDetail} />
        </Switch>

        <header className="App-header">
          <p>Muse News Home Page</p>
        </header>
      </div>
    </Router>
  );
}

export default App;
