import React from 'react';
import {Link} from "react-router-dom";

function TeacherDashboard(props) {
    return (
      <div>

        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-lg-2 col-sm-6">
              <div className="circle-tile ">
                <a href="#"><div className="circle-tile-heading blue"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
                <div className="circle-tile-content dark-blue">
                  <div className="circle-tile-description text-faded"> Students Management</div>
                  <Link to="/student">
                  <a className="circle-tile-footer" href="#">More Info<i className="fa fa-chevron-circle-right"></i></a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6">
              <div className="circle-tile ">
                <a href="#"><div className="circle-tile-heading green"><i className="fa fa-tasks fa-fw fa-3x"></i></div></a>
                <div className="circle-tile-content dark-green">
                  <div className="circle-tile-description text-faded"> Students Acitivities </div>
                  <a className="circle-tile-footer" href="#">More Info<i className="fa fa-chevron-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TeacherDashboard;
