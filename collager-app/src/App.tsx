import React, { useState, useEffect } from 'react';
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
import InvalidSession from './components/Session/InvalidSession';
import ActiveSession from './components/Session/ActiveSession';
import PowerPointSession from './components/Session/PowerPointSession/PowerPointSession';

function App() {
  return (
    <Router>
      <Switch>
        {/* Test */}
        <Route path="/invalid">
          <InvalidSession />
        </Route>
        <Route path="/active">
          <ActiveSession sessionId={"sid"}/>
        </Route>
        <Route path="/pp">
          <PowerPointSession sessionId={"123"}/>
        </Route>

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
          <p>Home :)</p>
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
