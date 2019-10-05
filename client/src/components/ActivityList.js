import React from 'react';
import Moment from 'react-moment';


function ActivityList(props) {
    return (

        <div className="activity-feed" key={props.index}>
            <div className="feed-item">

                <div className="col-md-8 col-sm-12 col-xs-12 activityDetail">
                    <i className="fa fa-times" aria-hidden="true" value={props.activityId}
                        onClick={() => { props.deleteActivity(props.activityId) }}></i>

                    <div >
                        <h5>Activity Name: {props.activityName} </h5>
                    </div>

                    <div >
                        <h5 > Start Time: {' '}
                            <Moment format="YYYY-MM-DD">{props.activityDate}</Moment> 
                            {' '}
                            {props.activityTime}</h5>
                    </div>

                    <div className="activityDesc">
                        <span >Description:{props.description}</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ActivityList;
