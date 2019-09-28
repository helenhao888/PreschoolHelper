const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
// const User = require("../../models/users");



module.exports = function (app) {
    //For google auth,
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080/auth/google");

        // Request methods you wish to allow
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

        // Request headers you wish to allow
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", true);

        // Pass to next layer of middleware
        next();
    });


  
  
   
    //user sign up
    app.post("/api/signup", (req,res)  =>{
         
        const {email, password, firstName, lastName,studentLastName,studentFirstName} = req.body;
        console.log("studentLast",studentLastName);
        //ADD validation here 
        if(email===""||password==="" || firstName === "" ||
           lastName === "" || studentFirstName==="" || studentLastName ===""){
               return res.status(400).json({
                   message:"please input all the information"
               });
           };


        //check student table to make sure user has a valid student 
       console.log("student name",studentFirstName,studentLastName);
       
        db.Student.findOne({
            where :{firstName: studentFirstName,
                    lastName : studentLastName }
        }).then(student =>{
            console.log("student",student);
            if(student){
                if(!((student.parent1FirstName.toLowerCase() === firstName.toLowerCase() 
                   && student.parent1LastName.toLowerCase() === lastName.toLowerCase()) ||
                    (student.parent2FirstName.toLowerCase() === firstName.toLowerCase()
                     && student.parent2LastName.toLowerCase() === lastName.toLowerCase()))){
                        return res.status(400).json({
                            message:"You don't have a student in this school, please check"
                        });
                }else{
                    let studentId=student.id;
                    //creare user function with all parms
                    console.log("student id",studentId);
                    createUser(email,firstName,lastName,password,studentId,req,res);   
                }
            }else{
                return res.status(400).json({
                    message:"You don't have a student in this school, please check"
                });
            }
        }).catch(err=>{
            console.log("read student table err",err);
        });


                  
    
    }    
    );

    function createUser(email,firstName,lastName,password,studentId,req,res){

        db.User.findOne({
            where : {email}
        }).then ( user =>{
            if(user){
                res.status(400).json({
                    "email":"That email is already taken"
                })
            }else {

                
                const newUser = {
                    email,
                    password,
                    firstName,
                    lastName,
                    studentId,
                    accessLevel:"1"
                };
                

                bcrypt.genSalt(10,(err,salt) => {
                   
                    bcrypt.hash(newUser.password,salt,(err,hash) =>{
                      
                        if (err) throw err;
                        newUser.password = hash;
                        
                        db.User.create(newUser)
                            .then(user=>{
                                console.log("user",user);
                                res.status(200).json({
                                    user:"user created successfully",
                                    userCreated: true
                                })
                            })
                            .catch(err => {
                                console.log("db create err",err);
                                res.status(500).json({
                                    user: "user created with err " + err
                                })
                            })
                        })
                    })
                   
    
                }
    
            }).catch( err =>{
                res.status(500).json({
                    "message":"db read err : "+err
                })
    
            })
    };



    // @route POST /login
    // @desc logs in a user , return JWT
    app.post("/api/login", (req,res)  =>{
    
        console.log("req",req.body);
        const {email, password} = req.body;
        //ADD validation here 

        db.User.findOne({
            where:{email}
        }).then(user =>{
            if(!user) {

               return res.status(404).json({
                    email:"email not found"
                });
            };
            console.log("password",password);
            console.log(" user pass",user.password)
            let currentUser = user.get();

            console.log("password",password);
            console.log("current user pass",currentUser.password)
            //check password
            bcrypt.compare(password,currentUser.password)
                .then(isMatch => {
                    if(isMatch){
                        
                        //create the payload
                        const payload = {
                            id: currentUser.id,
                            email:currentUser.email,
                            firstName: currentUser.firstName,
                            lastName:user.lastName
                        }

                        console.log("payload",payload);
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600 *12 },
                            (err, token) =>{
                                console.log("token",token)
                                res.json({
                                    ...payload,
                                    success: true,
                                    token:`Bearer ${token}`
                                })
                            }
                        );
                    }else{
                      
                        return res.status(400).json({
                            password:"Incorrect password"
                        });
                    }
                })
                .catch(err=>{
                    console.log("check password err",err);
                    return res.status(400).json({
                        password:"check password err "+err
                    })
                })
                
        })
        .catch( err =>{
            console.log("db error ",err);
        })

    });

//get user info
   app.get("/api/user",passport.authenticate('jwt',{session:false}),
        (req,res)=>{
            db.User.findOne({where: {id:req.user.id}})
                .then( user => {
                    if(user){
                        res.status(200).json(user);
                    }
                })
                .catch(err=> {
                    console.log(err);
                    return res.status(500).json({
                        message:"get user info err "+err
                    })
                });
   })    

//update user profile, includes last name and first name
    app.put("/api/profile",
        passport.authenticate("jwt",{session:false}),
        (req,res) =>{
        
            const {id} = req.user;
            const {firstName,lastName} = req.body;

          
            db.User.findOne({
                where:{id}
            })
            .then(user=>{
                 if(user){
                     db.User.update({
                         firstName,
                         lastName
                     },{
                         where:{
                             id
                         }
                     })
                     .then(user=>{
                         if(user){
                             res.status(200).json({
                                 firstName:user.firstName,
                                 lastName:user.lastName,
                                 message:"account information has been updated successfully!",
                                 userUdpated:true
                             })
                         }
                     })
                     .catch(err=>{
                         return res.status(500).json({
                             message:"updating account fails with error :"+err,
                             userUdpated:false
                         })
                     })
                 }

            })
            .catch(err=>
                {
                    return res.status(500).json({
                        message:"read account fails with error :"+err,
                        userUdpated:false
                    })
                })
       
    })

    //change password
    app.put("/api/password",
        passport.authenticate("jwt",{session:false}),
        (req,res) =>{
          
            const {id} = req.user;
            const {currentPassword, newPassword} = req.body;

            db.User.findOne({
                where:{id}
            })
            .then(user=>{
                
                 if(user){
                    // console.log("user",user);
                    //check password
                    bcrypt.compare(currentPassword,user.password)
                    .then(isMatch => {
                       
                        if(isMatch){
                            
                            //hash new password
                            bcrypt.genSalt(10,(err,salt) => {
                   
                                bcrypt.hash(newPassword,salt,(err,hash) =>{
                                   
                                    if (err) throw err;   
                                 
                                        db.User.update({
                                           password:hash
                                        },{
                                            where:{
                                                id
                                            }
                                        })
                                        .then(user=>{
                                            if(user){
                                                res.status(200).json({                                                  
                                                    message:"password has been updated successfully!",
                                                    userUdpated:true
                                                })
                                            }
                                        })
                                        .catch(err=>{
                                            return res.status(500).json({
                                                message:"updating password fails with error :"+err,
                                                userUdpated:false
                                            })
                                        })
                                })
                            })

                        }else{
                            //password not matched
                             return res.status(400).json({
                                currentPassword:"current password error"
                                
                            })

                            

                        }
                    })
            }})   
            .catch(err=>
                {
                    return res.status(500).json({
                        message:"read account fails with error :"+err,
                        userUdpated:false
                    })
                })
       
    })

   
    //auth with google
    app.get("/auth/google",passport.authenticate("google",{
        scope:["profile"]
    },function(req,res){
        console.log("req",req);
        console.log("res",res);
    }));

    // app.get('/auth/google/redirect',passport.authenticate('google'),(req,res) =>{
    app.get("/auth/google/redirect",passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/homeMsg",
        failureFlash: true
    }
    ));

    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         {return next();}
    //     res.redirect("/");
    // }
};
