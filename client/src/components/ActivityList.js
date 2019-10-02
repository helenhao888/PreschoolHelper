import React from 'react';
import Moment from 'react-moment';

const styles={
    spanStyles:{
        color:"#E2B104"
    }
}


function ActivityList(props) {
    return (
        
        <div className="activity-feed" key={props.index}>
            <div className="feed-item">
                {/* <span style={styles.spanStyles}>{props.activityDate}</span> */}

                <div className="col-md-8 col-sm-12 col-xs-12 activityDetail">
                    <i class="fa fa-times" aria-hidden="true" value={props.activityId}
                             onClick={()=>{props.deleteActivity(props.activityId)} }></i>

                    <div > 
                        <h5>Activity Name: {props.activityName} </h5>
                    </div>

                    <div >
                        <h5 > Start Time: <Moment parse="HH:mm:ss">{props.activityTime}</Moment> </h5>
                    </div>

                    <div className="activityDesc">
                        {/* <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> */}
                            <span >Description:{props.description}</span>
                    </div>
                </div>
            </div>
    
      
        </div>
    )
}

export default ActivityList;
