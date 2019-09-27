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


 
};