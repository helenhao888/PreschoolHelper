import React,{Component} from 'react';
import LoginForm from "../components/LoginForm";
import API from "../utils/API";

class Login  extends Component {

    constructor(){
        super();
        this.state ={
            email:"",
            password:"",
            errors:{}
        };       
    }

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        API.login(this.state.email,this.state.password)
           .then(res=>{
               console.log("res",res);
               if(res.status===200){
                   console.log("redirect dashboard");
               }
           })
    }

    render(){
        return (
            
               <div className="container">
                    <LoginForm email={this.state.email} 
                               password={this.state.password} 
                               handleValueChange ={this.handleValueChange} 
                               handleSubmit = {this.handleSubmit} />
                   
                </div>
         
        )  
    } 
      
    
}

export default Login;
