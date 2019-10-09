import React from 'react';
// import Moment from 'react-moment';
import './style.css'


function ActivityReport(props) {
    return (
        <div className="activity-feed" key={props.index}>     
 
             <div className="row ">
                 <div className="col-md-12 lib-item" data-category="view" key={props.index}>
                     <div className="lib-panel">
                         <div className="row box-shadow" >
                             <div className="col-md-5">
                                 <img className="lib-img-show" src={process.env.PUBLIC_URL + props.imageOption}
                                      alt="activity" />
                                
                             </div>
                             <div className="col-md-7">
                                 <div className="lib-row lib-header">
                                     <h5 >{props.activityName} </h5>
                                     <h5 className="actTime"> {props.activityTime}</h5>
                                     <div className="lib-header-seperator"></div>
                                 </div>
                                 <div className="lib-row lib-desc">
                                     {props.description}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
           


        </div>
    )
}

export default ActivityReport;
