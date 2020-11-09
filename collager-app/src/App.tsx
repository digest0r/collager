import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useParams,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import Admin from "./components/Admin/Admin";
import Session from "./components/Session/Session";
import CreateSession from './components/CreateSession/CreateSession';
import InvalidSession from './components/Session/InvalidSession';
import ActiveSession from './components/Session/ActiveSession';

function App() {
  return (
    <Router>
      <Switch>
        {/* Test */}
        <Route path="/invalid">
          <InvalidSession />
        </Route>
        <Route path="/active">
          <ActiveSession />
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
