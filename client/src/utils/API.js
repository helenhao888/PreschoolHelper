import axios from "axios";

export default {

    login: (userData) =>{
       console.log("in API, email password",userData);
       return axios.post("/api/login",userData);
            
    },

    signup:(userData) =>{
        console.log("api signup",userData);
        return axios.post("/api/signup",userData );
    },

    updatePassword:(userData) => {
        console.log("change password",userData);
        return axios.put("/api/password",userData);
    },

    updateProfile:(userData) => {
        console.log("change profile",userData);
        return axios.put("/api/profile",userData);
    },

    getUser:()=>{
        console.log("get user")
        return axios.get("/api/user");
    },

    addStudent:(studentData) => {
        return axios.post("/api/student",studentData);
    },

    getStudent:(id) =>{
        
        return axios.get("/api/student/"+id);
    },

    getAllStudents:() =>{
        
        return axios.get("/api/student/");
    },
    
    deleteStudent:(id) => {
        console.log("api delete id",id);
        return axios.delete("/api/student/"+id );
    },

    updateStudent:(id,studentData)  => {
        console.log("update student",id+studentData);
        return axios.put("/api/student/"+id,studentData);
    },
    getAllActivities:() =>{
        
        return axios.get("/api/activity/");
    },
    addActivity:(activityData) => {
        console.log("Add act ",activityData)
        return axios.post("/api/activity",activityData);
    },

    delActivity:(id) => {
        console.log("api delete id",id);
        return axios.delete("/api/activity/"+id );
    },

    getReport:(id,date)=>{
        console.log("get report"+date);
        return axios.get("/api/report/"+date);
    }
  
};