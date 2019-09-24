import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import NotMatch from './pages/notMatch';


function App() {
  return (
    <div className="App">
      <Router>
       <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotMatch} />
          {/* `*` (get) - Will load your single HTML page in `client/build/index.html`. Make sure you have this _after_ all other routes are defined. */}
        </Switch>
        </Router>  
    </div>
  );
}

export default App;
