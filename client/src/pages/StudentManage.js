import React,{Component} from 'react';
import {Redirect} from "react-router-dom";
import setAuthToken from '../utils/setAuthtoken';
import Navbar from '../components/Navbar';
import API from '../utils/API';
import AddStudentForm from '../components/AddStudentForm';
import UpdateStudentForm from '../components/UpdateStudentForm';

class StudentManage  extends Component {

    constructor(){
        super();
        this.state ={
            redirect:false,
            students:[],
            errors:{},
            studentUpdated:false,
            message:"",
            firstName:"",
            lastName:"",
            parent1FirstName:"",
            parent1LastName:"",
            parent2FirstName:"",
            parent2LastName:"",
            classId:"",
            action:"",
            studentId:0
        }
    };

    componentWillMount(){
        const token = localStorage.getItem('preschool-app');

        if (token){
            setAuthToken(token);
        }

        this.getStudents();

      
    };

    getStudents=()=>{
        API.getAllStudents()
        .then(res=>{
            console.log("res get students",res);
            this.setState({
                students:res.data
            })
            console.log("state student",this.state.students);
        })
        .catch(err=> console.log(err));
    }


    deleteStudent=(id)=>{
        console.log("delete",id);
       
        API.deleteStudent(id)
        .then(res=>{
            console.log("res",res.data);
            this.getStudents();
           
            console.log("state student",this.state.students);
        })
        .catch(err=> console.log(err));
    }

    updateStudent=(id)=>{
        console.log("update",id);
        this.setState({action:"update"});

        API.getStudent(id)
           .then(res=>{
               console.log("get student res",res.data);
       
            this.setState({firstName:res.data.firstName,
                           lastName:res.data.firstName,
                            parent1FirstName:res.data.parent1FirstName,
                            parent1LastName:res.data.parent1LastName,
                            parent2FirstName:res.data.parent2FirstName,
                            parent2LastName:res.data.parent2LastName,
                            classId: res.data.classId,
                            studentId: id})
           })
           .catch(err=>{
               console.log("get student by id fails with err",err);
           })
    }


    renderTableData(students){

        console.log("student in render",students)
       return students.map((student,index)=>{
           return(             
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.parent1FirstName}</td>
                <td>{student.parent1LastName}</td>
                <td>{student.parent2FirstName}</td>
                <td>{student.parent2LastName}</td>
                <td>{student.classId}</td>
                <td > 
                     <a href="#"  onClick={()=>{this.deleteStudent(student.id)} } value={student.id}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
                     <a href="#"  onClick={()=>{this.updateStudent(student.id)} } value={student.id}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                   
                </td>    
            </tr>
           )
           
        })
    
    }

    handleValueChange = (event)=>{
        const {name,value} = event.target;
        console.log("event",event.target)
        this.setState({
            [name]:value.trim()
        })
    };

    // handleSelectChange=(event)=>{
    //       this.setState({
    //           classId:event.target.value
    //       })
    // }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("handle submit");

        this.setState({
            studentUpdated: false,
            message: "",
            errors:{},
            firstName:"",
            lastName:"",
            parent1FirstName:"",
            parent1LastName:"",
            parent2FirstName:"",
            parent2LastName:"",
            classId:""
            });

        const {firstName,lastName,parent1FirstName,parent1LastName,
                  parent2FirstName,parent2LastName,classId,studentId} = this.state;

        const studentData={
            firstName,
            lastName,
            parent1FirstName,
            parent1LastName,
            parent2FirstName,
            parent2LastName,
            classId
        };

        if(firstName === "" || lastName==="" || parent1FirstName ==="" ||
           parent1LastName ===""|| classId===""){
               let validationMsg = {
                   message:"Please fill in all the fields!"
               }
               this.setState({
                   errors: validationMsg
               })
           }else{

               if(this.state.action==="add"){     
                    API.addStudent(studentData)
                    .then((res)=>{
                        console.log("res",res);
                        this.setState({
                            studentUpdated: res.data.studentUpdated,
                            message: res.data.student
                        
                            });
                        this.getStudents();    
                    })          
                    .catch( err=>{
                        console.log("add student err",err);
                        this.setState({
                            errors:err.response.data
                        })
                    })
               }
               console.log("action",this.state.action)
               if(this.state.action==="update"){
                    console.log("update stu");
                    API.updateStudent(studentId,studentData)
                    .then((res)=>{
                        console.log("res",res);
                        this.setState({
                            studentUpdated: res.data.studentUpdated,
                            message: res.data.student
                        
                            });
                        this.getStudents();    
                    })          
                    .catch( err=>{
                        console.log("update student err",err);
                        this.setState({
                            errors:err.response.data
                        })
                    })
               }    
            }
    }

    render(){

        const {redirect,students,firstName,lastName,parent1FirstName,parent1LastName,
                parent2LastName,parent2FirstName,classId,errors,message,action} = this.state;

        if(redirect){
            return <Redirect to="/" />
        }

        return (
            
            <div className="container">
                <Navbar />
                <h4> Student Management </h4>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Parent1 FName</th>
                            <th scope="col">Parent1 LName</th>
                            <th scope="col">Parent2 FName</th>
                            <th scope="col">Parent2 LName</th>
                            <th scope="col">ClassId</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData(students)}
                   
                    </tbody>
                </table>
                <div class="row">
                    <button type="button" class="btn add-btn">
                        <i class="fa fa-plus" aria-hidden="true"></i>                       
                        Add Student</button>
                </div>
                {action === "add" ?
                
                 
                (<AddStudentForm firstName={firstName}
                                lastName ={lastName}
                                parent1FirstName={parent1FirstName}
                                parent1LastName={parent1LastName}
                                parent2FirstName={parent2FirstName}
                                parent2LastName={parent2LastName}   
                                classId = {classId}          
                                errors={errors}   
                                message={message}
                                handleValueChange={this.handleValueChange}
                                handleSubmit={this.handleSubmit}
                />) :
                (<UpdateStudentForm 
                                firstName={firstName}  
                                lastName ={lastName}
                                parent1FirstName={parent1FirstName}
                                parent1LastName={parent1LastName}
                                parent2FirstName={parent2FirstName}
                                parent2LastName={parent2LastName}   
                                classId = {classId}         
                                errors={errors}   
                                message={message}
                                handleValueChange={this.handleValueChange}
                                handleSubmit={this.handleSubmit}/>)
                }

               
            </div>
        )
    } 
      
    
}

export default StudentManage;
