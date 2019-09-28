import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import setAuthToken from '../utils/setAuthtoken';
import axios from "axios";
import Moment from 'react-moment';
import Navbar from '../components/Navbar';
import TeacherDashboard from '../components/TeacherDashboard';

class Dashboard  extends Component {

    constructor(){
        super();
        this.state ={
            redirect:false,
            user:{},
            errors:{}
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

   

    render(){

        const {redirect,user} = this.state;

        if(redirect){
            return <Redirect to="/" />
        }

        return (
            
            <div className="container">
                <Navbar />
              <h1> Dashboard </h1>
              <p>
                  {' '}
                  <strong>Welcome, {user.firstName}</strong> 
              </p>
              <p>
                  {' '}
                  <strong>Member since:{' '} 
                          <Moment date={user.createdAt} format="YYYY/MM/DD" /></strong> 
              </p>
              <TeacherDashboard />
              
            </div>
        )
    } 
      
    
}

export default Dashboard;
