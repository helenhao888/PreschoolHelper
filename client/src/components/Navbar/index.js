import React ,{Component} from "react";
import {Link} from "react-router-dom";
import "./style.css";
import {Redirect} from "react-router-dom";


class Navbar extends Component{

  constructor(){
    super();
    this.state ={
      redirect:false
  }

  };

  handleLogout = () =>{
    localStorage.removeItem('preschool-app');
    this.setState({
        redirect: true
    });
  };

  render (){

    const {redirect} = this.state;

    if(redirect){
        return <Redirect to="/" />
    }

    return (
          
 
    <div>
      <nav className="navbar navbar-expand-lg navStyle">
        <a className="brand-navbar" href="#"><img src="#" alt="Logo image" height="30px" /></a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#mainMenu">
          <span><i className="fa fa-align-right iconStyle"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="mainMenu">
          <ul className="navbar-nav ml-auto navList">
            <li className="nav-item active" ><Link to="/dashboard">
              <i className="fa fa-home"></i>HOME<span className="sr-only">(current)</span>
            </Link></li>
           
            
            <li className="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                 <i className="fa fa-user"></i>Account <span class="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#"><i className="fa fa-info" aria-hidden="true"></i>Profile</a></li>
                <li><a href="#"><i className="fa fa-lock" aria-hidden="true"></i>Security</a></li>
                <li className="divider"></li>
                <li><a href="#" onClick={this.handleLogout}><i className="fa fa-sign-out"></i>Logout</a></li>
              </ul>
            </li>
          </ul>    
        </div>    
      </nav>

      
    </div>            

  );
}
}

export default Navbar;
