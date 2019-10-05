import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import setAuthToken from '../utils/setAuthtoken';
import Moment from 'react-moment';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import API from '../utils/API';
import moment from 'moment';
import ActivityReport from '../components/ActivityReport';

 

class Dashboard  extends Component {

    constructor(){
        super();
        this.state ={
            redirect:false,
            user:{},
            errors:{},
            date:"",
            studentId:0,
            student:"",
            report:[]
        }
    };

    componentDidMount(){
        console.log("components mounted")
        const token = localStorage.getItem('preschool-app');
        console.log("token",token);
        if (token){
            setAuthToken(token);

            API.getUser()
            .then(res=>{
                console.log("get user",res.data)
                let currentDate=new Date();

                this.setState({
                    studentId:res.data.studentId,
                    user:res.data
                });
                console.log("this state stid",this.state.studentId)
                
                
                this.getStudentReport(currentDate);
            })
            .catch(err=> console.log(err));
        }

        
    };

    getStudentReport = (reportDate)=>{

        const {studentId} = this.state;
        console.log("studentid",studentId)
        console.log("report date",reportDate);
        let convDate=moment(reportDate).format('YYYY-MM-DD');
        

        API.getReport(studentId,convDate)
           .then(res=>{
               console.log("report res",res.data)
               this.setState({
                   report:res.data.report,
                   student:res.data.student})
               console.log("report",this.state.report);
               console.log("student",res.data.student)
           
           })
           .catch(err=> console.log(err));
    }
   
    onChange = date => {
        console.log("date",date)

        this.setState({ date });
        console.log("after date",date)
      
        this.getStudentReport(date);
       
    };

    renderActivities=()=>{
    
        const {report} = this.state;

        return report.map((activity,index)=>{
            let imageOption=this.renderImage(activity.activityName);
            return( <ActivityReport 
             activityId={activity.id}
             activityName={activity.activityName}
             activityDate={activity.activityDate}
             activityTime={activity.activityTime}
             description ={activity.description}
             classId = {activity.classId}           
             index = {index}
             imageOption={imageOption}
             />)

        })
    }

    renderImage=(name)=>{
        console.log("render image name", name);
        if (name.includes("drawing")) {
            return "/image/drawing.jpg";
        } else if (name.includes("snack")) {
            return "/image/snack.jpg";
        } else if (name.includes("play")) {
            return "/image/play.jpg";
        } else {
            return "/image/other.jpg";
        };
                               
      }
    


    render(){

        const {redirect,user,student,date} = this.state;

        if(redirect){
            return <Redirect to="/" />
        }

        return (
            
            <div className="container">
                <Navbar />
                <h1> Dashboard </h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <p>
                                {' '}
                                <strong>Welcome, {user.firstName}</strong>
                            </p>
                            <hr />
                            <p>
                                {' '}
                                <strong>Member since:{' '}
                                    <Moment date={user.createdAt} format="YYYY/MM/DD" /></strong>
                            </p>
                        </div>
                        <div className="row calendarBox">
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </div>
                    </div>

                    <div className="col-md-8 col-lg-8">
                        <div className="bg-light">
                          <div className="card-img-top">
                             <h5> Dialy Report </h5> 
                             <span>{student.firstName}  {student.lastName}
                                    <a href="#" className="float-right btn btn-sm btn-info d-inline-flex share"><i className="fa fa-share-alt"></i></a></span>
                            </div>
                            <div className="card-body">
                                

                                <div className="card-text">
                                   
                                    {this.renderActivities()}
                                </div>
                                <a href="#" className="btn btn-sm btn-info float-right">Read more <i className="fa fa-angle-double-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
      
    
}

export default Dashboard;
