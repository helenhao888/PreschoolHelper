import React,{Component} from 'react';
import Navbar from '../components/Navbar';
import Moment from 'react-moment';
import setAuthToken from '../utils/setAuthtoken';
import axios from 'axios';
import API from '../utils/API';

const styles={
    readonlyStyles: {
    
        backgroundColor:"transparent",
        border: "0",
        fontSize: "1em"
      
    }
};

class Profile extends Component{

    constructor(){
        super();
        this.state ={          
            user:{},
            errors:{},
            message:"",
            userUpdated:false
        }
    };

    componentDidMount(){
        const token = localStorage.getItem('preschool-app');

        if (token){
            setAuthToken(token);
        }

        axios
            .get('/api/user')
            .then(res=>{
                this.setState({
                    user:res.data
                })
            })
            .catch(err=> console.log(err));
    };

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    };

    handleSaveSubmit=(event)=>{

        event.preventDefault();
        console.log("save")
        const {firstName,lastName} = this.state;

        this.setState({
            message:""
        });

        const profileData={
            firstName,
            lastName
        }
        API.updateProfile(profileData)
        .then(res=>{
            console.log("update successuflly",res);
            console.log("res.data",res.data);
            this.setState({
                userUpdated: res.data.userUpdated,
                message: res.data.message
               
            });
        })
        .catch((err)=>{
            
            console.log("update profile err",err.response.data);
        
        this.setState({
            errors:err.response.data
        });
        })
    }

    
    
    render(){
        const {user,errors,firstName,lastName,message} = this.state;

        return (
            <div className="container">
                <Navbar />
                <p>
                    {' '}
                    <strong>Hi, {user.firstName}{' '}{user.lastName}</strong>
                </p>
                <p>
                    {' '}
                    <strong>Member since:{' '}
                        <Moment date={user.createdAt} format="YYYY/MM/DD" /></strong>
                </p>

                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Profile</h3>
                            
                           
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <label htmlFor="email" className="col-md-5 control-label">Email</label>
                                    <input type="text" className="form-control" readonly placeholder="email"
                                        name="email" value={user.email}
                                        style={styles.readonlyStyles}
                                    />
                                </div>


                                <div className="input-group form-group">
                                    <label htmlFor="firstName" className="col-md-5 control-label">First Name</label>
                                    <input type="text" className="form-control" placeholder={user.firstName}
                                        name="firstName" value={firstName}
                                        onChange={this.handleValueChange} />
                                </div>

                                <div className="input-group form-group">
                                    <label htmlFor="lastName" className="col-md-5 control-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder={user.lastName}
                                        name="lastName" value={lastName}
                                        onChange={this.handleValueChange} />
                                </div>


                                <div className="form-group">
                                    <button type="submit" value="Save" className="btn btn-primary float-right signup_btn"
                                        onClick={this.handleSaveSubmit}>Save </button>
                                </div>
                                {message && (
                                        <div style={styles.errorStyles}>{message}</div>)}
                            </form>
                        </div>

                    </div>
                </div>
            </div>    
        )
    }
}

export default Profile;
