import React from 'react';
// import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //nu era
// import 'bootstrap/dist/css/bootstrap.min.css'; //nu era
// import Baby from 'https://open.spotify.com/embed/track/6epn3r7S14KUqlReYr77hA?utm_source=generator';
// import { AudioPlaylist } from 'ts-audio';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import FavoriteList from './components/FavoriteList';

const App = () => {

  return (
    <>
      {/* <Header /> */}
      
      <Router>
        {/* <div> */}
        <Switch>
          <Route path="/home">
          <Header></Header>
          <Main></Main>
          </Route>
          <Route path="/favoritelist">
          <Header></Header>
              <FavoriteList></FavoriteList>
          </Route>
        </Switch>
        {/* </div> */}
      </Router>
      {/* <Main /> */}
      <Footer />
    </>
  );
};

export default App;
