import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import setAuthToken from '../utils/setAuthtoken';
import Navbar from '../components/Navbar';
import API from '../utils/API';
import ActivityList from '../components/ActivityList';
import AddActivity from '../components/AddActivity';


class Activities  extends Component {

    constructor(props){
        super(props);
        this.state ={
            redirect:false,
            activities:[],
            errors:{},
            message:"",
            activityId:"",
            activityName:"",
            activityDate:"",
            activityTime:"",
            description:"",
            classId:"",
            action:""
        }

    }  

    componentDidMount(){
        const token = localStorage.getItem('preschool-app');

        if (token){
            setAuthToken(token);
        }

        this.getActivityList();

      
    };

    handleValueChange=(event)=>{
        const {value, name} = event.target;

        this.setState({
            [name]:value,
            message:""
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("handle submit");

        this.setState({
            
            message: "",
            errors:{},           
            action:"add"
            });
            
        const { activityName,activityDate,activityTime,description,classId} = this.state;

        const activityData={
            activityName,
            activityDate,
            activityTime,
            description,
            classId
        };

        console.log("activitydata",activityData);

        if(activityName === "" || activityDate==="" || activityTime ==="" ||
            description ===""|| classId===""){
               let validationMsg = {
                   message:"Please fill in all the fields!"
               }
               this.setState({
                   errors: validationMsg
               })
           }else{
               console.log("before compare action",this.state.action)
            //    if(this.state.action==="add"){  
                   console.log("before call add activity",activityData);   
                    API.addActivity(activityData)
                    .then((res)=>{
                        console.log("res",res);
                        this.setState({
                            // studentUpdated: res.data.studentUpdated,
                                message: res.data.activity,                            
                                activityName:"",
                                activityDate:"",
                                activityTime:"",
                                description:"",
                                classId:""
                            });
                        this.getActivityList();    
                              
                    })          
                    .catch( err=>{
                        console.log("add activity err",err);
                        this.setState({
                            errors:err.response.data
                        })
                    })
            //    }
              
              
            }
    }

    
    getActivityList=()=>{
        // const date = new Date();
        API.getAllActivities()
        .then(res=>{
            console.log("res get activites",res);
            this.setState({
                activities:res.data
            })
            console.log("state activity",this.state.activities);
        })
        .catch(err=> console.log(err));
    }


    renderActivityData(){

        const {activities} = this.state;
        console.log("activites in render",activities)
       return activities.map((activity,index)=>{
           return( <ActivityList 
            activityId={activity.id}
            activityName={activity.activityName}
            activityDate={activity.activityDate}
            activityTime={activity.activityTime}
            description ={activity.description}
            classId = {activity.classId}
            deleteActivity={this.deleteActivity}
            index = {index} />)
        })
    }      

    deleteActivity=(id)=>{
        console.log("Delete",id);
        API.delActivity(id)
        .then(res=>{
            console.log("res",res.data);
            this.getActivityList();
           
            
        })
        .catch(err=> console.log(err));
    }

    render(){

        const {redirect,errors,message,activityName, activityDate,activityTime,classId,description} = this.state;
        

        if(redirect){
            return <Redirect to="/" />
        }

        return (

            <div className="container">
                <Navbar />
                <h4> Activities </h4>
                <div className="row">
                    <div className="col-md-6">
                        
                        {this.renderActivityData()}
                       
                    </div>
                    <div className="col-md-6" >
                         <AddActivity 
                          activityName={activityName}
                          activityDate={activityDate}
                          activityTime={activityTime}
                          description ={description}
                          classId = {classId}
                          handleValueChange={this.handleValueChange}
                          handleSubmit={this.handleSubmit}
                          errors={errors}   
                          message={message}
                          />
                    </div>
                </div>
            </div>        
        )

    } 
      
    
}

export default Activities;