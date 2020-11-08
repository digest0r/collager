import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useParams,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import Home from "./Home";
import Admin from "./Admin";
import Session from "./Session";
import CreateSession from './CreateSession';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/new">
          <CreateSession />
        </Route>
        <Route path="/s/:id">
          <Session />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
