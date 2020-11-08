import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useParams,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import Admin from "./Admin/Admin";
import Session from "./Session/Session";
import CreateSession from './CreateSession/CreateSession';

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
          <p>Home :)</p>
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
