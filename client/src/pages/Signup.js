import React,{Component} from 'react';
import SignupForm from '../components/SignupForm';
import API from '../utils/API';
import {Redirect} from "react-router-dom";

class Signup extends Component{

    constructor(){
        super();
        this.state ={
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            inviteCode:"",
            errors:{},
            redirect:false
        };       
    }

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    };

    handleSignupSubmit = (event) => {
        event.preventDefault();
        const {email,firstName,lastName,password} = this.state;

        
        const signupData={
            email,
            firstName,
            lastName,
            password
        };
        
        API.signup(signupData)
           .then(res=>{
               console.log("res",res);
               if(res.status===200){
                   console.log("redirect login");
                   this.setState({
                    errors:{},
                    redirect:true
                    });

               }
           })
           .catch(err=>{
               console.log("sign up err",err.response.data);
               this.setState({
                   errors:err.response.data
               })
           })
    }

   render(){

    const {redirect,email,password,firstName,lastName,inviteCode,errors} = this.state;

    if (redirect){
        return <Redirect to="/login" />
    }

    return (
        <div className="signup-page-container">
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <h2>PRESCHOOL HELPER</h2>
                </div>
                <div className="col-md-9 col-sm-12">
                    <SignupForm email={email}
                        password={password}
                        firstName={firstName}
                        lastName={lastName}
                        inviteCode={inviteCode}
                        errors={errors}
                        handleValueChange={this.handleValueChange}
                        handleSignupSubmit={this.handleSignupSubmit} />
                </div>
            </div>           
        </div>
    )
   }
}

export default Signup
