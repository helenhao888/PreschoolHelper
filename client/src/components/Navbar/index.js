import React from "react";
import {Link} from "react-router-dom";
import "./style.css"


function Navbar() {


  return (
                     
   
      <nav className="navbar navbar-expand-lg  sticky-top">

          <Link className="navbar-brand" to="/">
              <div className="logo">Google Books</div>
          </Link>

         
          <div className="navbar" >
              <div className="navbar-nav">
                  <Link className="nav-item" to="/search">
                      <i className="fa fa-search" aria-hidden="true">  Search</i>
                  </Link>

                  <Link className="nav-item" to="/save">
                      <i className="fa fa-bookmark" aria-hidden="true">  Saved</i>
                  </Link>
                  
              </div>
          </div>
      </nav>

  );
}

export default Navbar;
