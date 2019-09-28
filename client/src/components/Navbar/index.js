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
          <span className="iconStyle">Preschool Helper</span>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#mainMenu">
            <span><i className="fa fa-align-right iconStyle"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="mainMenu">
            <ul className="navbar-nav ml-auto navList">
              <li className="nav-item active" >
                <Link to="/dashboard">
                <i className="fa fa-home"></i>HOME<span className="sr-only">(current)</span>
                </Link>
              </li>


              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  <i className="fa fa-user"></i>Account <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><Link to="/profile">
                    <i className="fa fa-info" aria-hidden="true"></i>Profile
                  </Link></li>
                  <li>  <Link to="/security">
                     <i className="fa fa-lock" aria-hidden="true"></i>Security
                  </Link>
                  </li>
                  <li><a onClick={this.handleLogout}><i className="fa fa-sign-out"></i>Logout</a></li>
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
