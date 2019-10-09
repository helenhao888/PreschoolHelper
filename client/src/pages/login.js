import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import API from "../utils/API";
import authenticate from '../utils/Authentication';
import setAuthToken from '../utils/setAuthtoken';
import './style.css';




class Login  extends Component {

    constructor(){
        super();
        this.state ={
            email:"",
            password:"",
            errors:{},
            redirect:false,
            accessLevel:""
        };       
    }

    componentDidMount(){
        const token = localStorage.getItem("preschool-app");

        console.log("token",token)
        if(authenticate(token)){
            this.setState({
                redirect:true
            });
        };
    };

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const data={
            email:this.state.email,
            password:this.state.password
        }
       

        API.login(data)
           .then(res=>{
               console.log("res",res);
               if(res.data.token){
                  
                   const {token} = res.data;
                   console.log("res data",res.data.accessLevel);

                   if(token){
                       localStorage.setItem("preschool-app",token);
                       setAuthToken(token);

                       this.setState({
                        errors:{},
                        redirect:true,
                        accessLevel:res.data.accessLevel
                        });
                   }
                   
            
               }
           })
           .catch((err)=>{
            console.log("res message",err.response.data);  
                
            this.setState({errors:err.response.data});
            
           })
    }

    render(){
        const {email, password, errors,redirect,accessLevel} = this.state;
        if (redirect){
           
              if (accessLevel === "0"){
                  return <Redirect to="/dashboard" />
              }else{
                  return <Redirect to="/dashboard/parent" />
              }
              
        }

        return (               
            
            <div className="container-fluid login-page-container">
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <h2>PRESCHOOL HELPER</h2>
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <LoginForm email={email}
                            password={password}
                            handleValueChange={this.handleValueChange}
                            handleSubmit={this.handleSubmit}
                            errors={errors} />
                    </div>
                </div>
            </div>
        )  
    } 
      
    
}

export default Login;
