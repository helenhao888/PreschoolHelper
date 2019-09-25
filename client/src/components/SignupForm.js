import React from 'react'

function SignupForm(props) {
    return (
    <div className="signup-container">
        <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                        <hr />
                        <div className="d-flex justify-content-end social_icon">                                  
                            <span><i className="fa fa-google-plus-square">  Sign Up with Google</i></span>                                   
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">  
                                <label for="email" class="col-md-4 control-label">Email</label>                            
                                <input type="text" className="form-control" placeholder="email" 
                                       name="email" value={props.email}
                                       onChange={props.handleValueChange} />                           
                            </div>

                            <div className="input-group form-group">  
                                <label for="firstName" class="col-md-4 control-label">First Name</label>                            
                                <input type="text" className="form-control" placeholder="first name" 
                                       name="firstName" value={props.firstName}
                                       onChange={props.handleValueChange} />                           
                            </div>

                            <div className="input-group form-group">  
                                <label for="lastName" class="col-md-4 control-label">Last Name</label>                            
                                <input type="text" className="form-control" placeholder="last name" 
                                       name="lastName" value={props.lastName}
                                       onChange={props.handleValueChange} />                           
                            </div>

                            <div className="input-group form-group">  
                                <label for="lastName" class="col-md-4 control-label">Password</label>                               
                                <input type="password" className="form-control" placeholder="password"
                                       name ="password" value = {props.password} 
                                       onChange={props.handleValueChange} />
                            </div>

                            <div className="input-group form-group">  
                                <label for="inviteCode" class="col-md-4 control-label">Invite Code</label>                               
                                <input type="text" className="form-control" placeholder="invite code"
                                       name ="inviteCode" value = {props.inviteCode} 
                                       onChange={props.handleValueChange} />
                            </div>
                          
                            <div className="form-group">
                                <button type="submit" value="Signup" className="btn btn-primary float-right signup_btn"
                                        onClick = {props.handleSingupSubmit}>Sign up </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Already have an account?<a href="/login">Sign In</a>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
