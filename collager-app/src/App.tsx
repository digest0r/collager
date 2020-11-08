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
import InvalidSession from './Session/InvalidSession';

function App() {
  return (
    <Router>
      <Switch>
        {/* Test */}
        <Route path="/invalid">
          <InvalidSession />
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
