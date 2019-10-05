import React from 'react';

function AddActivity(props) {
    return (
        <div className="contianer">
            {/* <div className="col-md-6 offset-md-2"> */}
            <form>
                <div className="title">Add Activity</div>

                <div className="input-group form-group">
                    <label htmlFor="activityName" className="col-md-4 control-label">Activity Name</label>
                    <input type="text" className="form-control" placeholder="activity name" 
                    onChange={props.handleValueChange}
                        name="activityName" value={props.activityName}
                         />
                </div>

                 <div className="input-group form-group">
                     <label htmlFor="activityDate" className="col-md-4 control-label">Activity date</label>
                     <input type="date" className="form-control" placeholder="activity date"
                         name="activityDate" value={props.activityDate}
                         onChange={props.handleValueChange} />
                 </div>              

                 <div className="input-group form-group">
                     <label htmlFor="activityTime" className="col-md-4 control-label">Start Time</label>
                     <input type="time" className="form-control" placeholder="Activity start time"
                         name="activityTime" value={props.activityTime}
                         onChange={props.handleValueChange} />
                 </div>

                 <div className="input-group form-group">
                     <label htmlFor="description" className="col-md-4 control-label">Description</label>
                     <textarea rows="3" name="description" value={props.description}
                               onChange={props.handleValueChange}></textarea>                     
                 </div>    

                 <div className="input-group form-group">
                     <label htmlFor="classId" className="col-md-4 control-label">Class Id</label>
                     <select className="form-control" id="classId"
                             name="classId" value={props.classId}
                             onChange={props.handleValueChange} >
                         <option>select</option>
                         <option>001</option>
                         <option>002</option>                     
                     </select>
                 </div>

                 <div className="form-group">
                     <button type="submit" value="Add" className="btn btn-primary float-right " 
                         onClick={props.handleSubmit}> Add </button>
                 </div>
            </form>
            {props.errors.message && (
                <div className="errorBox">{props.errors.message}</div>
            )} 
             {props.message && (
                 <div className="infoBox">{props.message}</div>)}
            </div>
        // </div>
    )
}

export default AddActivity;
