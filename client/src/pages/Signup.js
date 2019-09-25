import React,{Component} from 'react';
import SignupForm from '../components/SignupForm';
import API from '../utils/API';

class Signup extends Component{

    constructor(){
        super();
        this.state ={
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            inviteCode:"",
            errors:{}
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

        API.singup(signupData)
           .then(res=>{
               console.log("res",res);
               if(res.status===200){
                   console.log("redirect dashboard");
               }
           })
    }

   render(){
    return (
        <div>
        
            <SignupForm email={this.state.email} 
                        password={this.state.password} 
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        inviteCode={this.state.inviteCode}
                        handleValueChange ={this.handleValueChange} 
                        handleSignupSubmit = {this.handleSignupSubmit} />
        </div>
    )
   }
}

export default Signup
