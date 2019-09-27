import React from 'react';

const styles = {
    
    errorStyles: {
    color: "#cc0000",
    fontSize:"0.8rem",
    fontWeight: "400",
    margin:"0",
    textAlign:"left"
  }
};

function LoginForm(props) {
    return (
    <div className="loginForm-container">
        <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <hr />
                        <div className="d-flex justify-content-end social_icon">                                  
                            <span><i className="fa fa-google-plus-square">  Sign In with Google</i></span>                                   
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="email" 
                                       name="email" value={props.email}
                                       onChange={props.handleValueChange} />                               

                            </div>
                            {props.errors.email && (
                                        <div style={styles.errorStyles}>{props.errors.email}</div>)
                                    }
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password"
                                       name ="password" value = {props.password} 
                                       onChange={props.handleValueChange} />
                            </div>
                            {props.errors.password && (
                                        <div style={styles.errorStyles}>{props.errors.password}</div>)
                                    }
                           
                            <div className="form-group">
                                <button type="submit" value="Login" className="btn btn-primary float-right login_btn"
                                        onClick = {props.handleSubmit}>Login </button>
                            </div>
                        </form>
                                                
                              

                    </div>
                   
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                           <span> Don't have an account?</span><a href="/signup"> Sign Up</a>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
