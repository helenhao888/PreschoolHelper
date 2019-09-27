import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import NotMatch from './pages/notMatch';
import Signup from './pages/Signup';
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";
import Security from "./pages/Security";


function App() {
  return (
    <div className="App">
     
      <Router>
       <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/security" component={Security} />
          <Route component={NotMatch} />
          {/* `*` (get) - Will load your single HTML page in `client/build/index.html`. Make sure you have this _after_ all other routes are defined. */}
        </Switch>
        </Router>  
    </div>
  );
}

export default App;
