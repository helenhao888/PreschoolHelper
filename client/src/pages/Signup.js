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
            studentfirstName:"",
            studentLastName:"",
            errors:{},
            redirect:false
        };       
    }

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value.trim()
        })
    };

    handleSignupSubmit = (event) => {
        event.preventDefault();
        const {email,firstName,lastName,password,studentFirstName,studentLastName} = this.state;

        
        const signupData={
            email,
            firstName,
            lastName,
            password,
            studentFirstName,
            studentLastName
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


    handleGoogleSignup=()=>{
        console.log("google signup")
    }

   render(){

    const {redirect,email,password,firstName,lastName,studentFirstName,studentLastName,errors} = this.state;

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
                        studentFirstName={studentFirstName}
                        studentLastName={studentLastName}
                        errors={errors}
                        handleValueChange={this.handleValueChange}
                        handleSignupSubmit={this.handleSignupSubmit}
                        handleGoogleSignup={this.handleGoogleSignup} />
                </div>
            </div>           
        </div>
    )
   }
}

export default Signup
