import React from 'react'

function LoginForm(props) {
    return (
    <div className="login-container">
        <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <hr />
                        <div className="d-flex justify-content-end social_icon">                                  
                            <span><i className="fa fa-google-plus-square">Sign In with Google</i></span>                                   
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
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password"
                                       name ="password" value = {props.password} 
                                       onChange={props.handleValueChange} />
                            </div>
                            {/* <div className="row align-items-center remember">
                                <input type="checkbox">Remember Me</input>
                            </div> */}
                            <div className="form-group">
                                <button type="submit" value="Login" className="btn btn-primary float-right login_btn"
                                        onClick = {props.handleSubmit}>Login </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        {/* <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
