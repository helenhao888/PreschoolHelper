import React from 'react';
import UploadImage from './UploadImage';

function AddStudentForm(props) {
    return (
        <div className="row">
            <div className="col-md-6 offset-md-2">
            <form>
                <h4>Add Student</h4>

                <div className="input-group form-group">
                    <label htmlFor="firstName" className="col-md-4 control-label">First Name</label>
                    <input type="text" className="form-control" placeholder="first name" 
                    onChange={props.handleValueChange}
                        name="firstName" value={props.firstName}
                         />
                </div>

                 <div className="input-group form-group">
                     <label htmlFor="lastName" className="col-md-4 control-label">Last Name</label>
                     <input type="text" className="form-control" placeholder="last name"
                         name="lastName" value={props.lastName}
                         onChange={props.handleValueChange} />
                 </div>              

                 <div className="input-group form-group">
                     <label htmlFor="parent1FirstName" className="col-md-4 control-label">Parent1 First Name</label>
                     <input type="text" className="form-control" placeholder="first name"
                         name="parent1FirstName" value={props.parent1FirstName}
                         onChange={props.handleValueChange} />
                 </div>

                 <div className="input-group form-group">
                     <label htmlFor="parent1LastName" className="col-md-4 control-label">Parent1 Last Name</label>
                     <input type="text" className="form-control" placeholder="last name"
                         name="parent1LastName" value={props.parent1LastName}
                         onChange={props.handleValueChange} />
                 </div>    

                 <div className="input-group form-group">
                     <label htmlFor="parent2FirstName" className="col-md-4 control-label">Parent2 First Name</label>
                     <input type="text" className="form-control" placeholder="first name"
                         name="parent2FirstName" value={props.parent2FirstName}
                         onChange={props.handleValueChange} />
                 </div>

                 <div className="input-group form-group">
                     <label htmlFor="parent2LastName" className="col-md-4 control-label">Parent2 Last Name</label>
                     <input type="text" className="form-control" placeholder="last name"
                         name="parent2LastName" value={props.parent2LastName}
                         onChange={props.handleValueChange} />
                 </div>    

                  <div className="input-group form-group">
                     <label htmlFor="studentPhoto" className="col-md-4 control-label">Student Photo</label>
                     <input type="file" className="form-control" 
                         name="studentPhoto" value={props.studentPhoto}
                         onChange={props.handleValueChange} />
                 </div>    
                 <UploadImage />             

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

                 {/* <div className="input-group form-group">
                     <label htmlFor="studentPic" className="col-md-4 control-label">Student Picture</label>
                     <input type="file" className="form-control" 
                         name="studentPic" value={props.studentPic}
                         onChange={props.handleValueChange} />
                 </div>    */}

                 <div className="form-group">
                     <button type="submit" value="Add" className="btn btn-primary float-right " 
                         onClick={props.handleSubmit}>Add </button>
                 </div>
            </form>
            {props.errors.message && (
                <div className="errorBox">{props.errors.message}</div>
            )} 
             {props.message && (
                 <div className="infoBox">{props.message}</div>)}
            </div>
        </div>
    )
}

export default AddStudentForm
