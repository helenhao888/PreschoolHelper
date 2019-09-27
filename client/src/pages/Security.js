import React,{Component} from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/API';
import setAuthToken from '../utils/setAuthtoken';

const styles = {
    
    errorStyles: {
    color: "#cc0000",
    fontSize:"0.8rem",
    fontWeight: "400",
    margin:"0",
    textAlign:"left"
  }
};

class Security extends Component {

    constructor()  {

        super();
        this.state ={
            currentPassword:"",
            newPassword:"",
            confirmPassword:"",
            errors:{},
            userUpdated:false,
            message:""
        }
    };

    componentDidMount(){
        const token = localStorage.getItem('preschool-app');

        if (token){
            setAuthToken(token);
        }
    }

    handleValueChange=(event) =>{

        const {value, name} = event.target;
        this.setState({
            [name]:value
        });
        
    }

    handleSubmit=(event)=>{

        event.preventDefault();

        const { newPassword,currentPassword, confirmPassword} = this.state;

        this.setState({
            errors:{},
            userUpdated:false,
            message:""
        });

        
        //compare new password is same as confirm password
        if(newPassword !== confirmPassword){
            this.setState({
                errors:{confirmPassword:"Password not match!"}
            });
        } else {
                if(currentPassword === newPassword){
                    this.setState({
                        errors:{newPassword: "New password can't be same as the old one!"}
                    });
                }else{

                    const passwordData={
                        currentPassword,
                        newPassword
                    }

                    API.updatePassword(passwordData)
                    .then(res=>{
                        console.log("update successuflly",res);
                        console.log("res.data",res.data);
                        this.setState({
                            userUpdated: res.data.userUpdated,
                            message: res.data.message,
                            currentPassword:"",
                            newPassword:"",
                            confirmPassword:""
                        })
                    })
                    .catch((err)=>{
                        console.log("update password err",err);
                        console.log("err.response.data",err.response.data);
                    
                    this.setState({
                        errors:err.response.data
                    })
                })
            }
        }
    };
    

    render(){

        const {errors,currentPassword,newPassword,confirmPassword,message} = this.state;
        
        return (
            <div className="container">
                <Navbar />
                <h3>Change Password</h3>
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <label>Current Password</label>
                        <div className="form-group pass_show">
                            <input type="password" name="currentPassword" value={currentPassword}
                                onChange={this.handleValueChange}
                                className="form-control" placeholder="Current Password" />
                        </div>
                        {errors.currentPassword && (
                                        <div style={styles.errorStyles}>{errors.currentPassword}</div>)}
                        <label>New Password</label>
                        <div className="form-group pass_show">
                            <input type="password" name="newPassword" value={newPassword}
                                onChange={this.handleValueChange}
                                className="form-control" placeholder="New Password" />
                        </div>
                        {errors.newPassword && (
                                        <div style={styles.errorStyles}>{errors.newPassword}</div>)}
                        <label>Confirm Password</label>
                        <div className="form-group pass_show">
                            <input type="password" name="confirmPassword" value={confirmPassword}
                                onChange={this.handleValueChange}
                                className="form-control" placeholder="Confirm Password" />
                                {errors.confirmPassword && (
                                        <div style={styles.errorStyles}>{errors.confirmPassword}</div>)}
                        </div>
                        <div className="form-group">
                                <button type="submit" value="submit" className="btn btn-primary "
                                        onClick = {this.handleSubmit}>Submit </button>
                                {message && (
                                        <div style={styles.errorStyles}>{message}</div>)}
                                
                        </div> 

                    </div>
                </div>
            </div>
        )
    }
}

export default Security;
