import axios from "axios";

export default {

    login: (email,password) =>{
       console.log("in API, email password",email + password);
       return axios.post("/api/login",{
           email,password
       });
            
    }

 
};