import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import Login from './pages/login';
import TeacherDashboard from './pages/TeacherDashboard';
import NotMatch from './pages/notMatch';
import Signup from './pages/Signup';
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import StudentManage from './pages/StudentManage';
import Activities from './pages/Activities';
import ParentDashboard from './pages/ParentDashboard';



function App() {
  return (
    <div className="App">
     
      <Router>
       <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={TeacherDashboard} />
          <PrivateRoute exact path="/dashboard/parent" component={ParentDashboard} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/security" component={Security} />
          <PrivateRoute exact path="/student" component={StudentManage} />
          <PrivateRoute exact path="/activity" component={Activities} />
          <Route component={NotMatch} />
          {/* `*` (get) - Will load your single HTML page in `client/build/index.html`. Make sure you have this _after_ all other routes are defined. */}
        </Switch>
        </Router>  
    </div>
  );
}

export default App;
