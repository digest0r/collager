import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

import Admin from "./components/Admin/Admin";
import Session from "./components/Session/Session";
import CreateSession from './components/CreateSession/CreateSession';

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
        <Route path="/:mode/:id">
          <Session />
        </Route>
        <Route path="/">
          <p>Home :)</p>
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
