const db = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = function (app) {


    app.post("/api/student", (req,res)  =>{

       const {firstName,lastName, parent1FirstName,parent1LastName,
              parent2FirstName,parent2LastName,classId} = req.body;

        const newStudent = {
            firstName,
            lastName,
            parent1FirstName,
            parent1LastName,
            parent2FirstName,
            parent2LastName,
            classId          
            
        };

        db.Student.create(newStudent)
        .then(student=>{
            console.log("student",student);
            res.status(200).json({
                student:"student created successfully",
                studentCreated: true
            })
        })
        .catch(err => {
            console.log("db create err",err);
            res.status(500).json({
                student: "student created with err " + err
            })
        })    


    });

    app.put("/api/student", (req,res)  =>{



    });


    app.get("/api/student:id", passport.authenticate('jwt',{session:false}),
        (req,res)=>{
            db.Student.findOne({where: {id:req.params.id}})
                .then( student => {
                    if(student){
                        res.status(200).json(student);
                    }
                })
                .catch(err=> {
                    console.log(err);
                    return res.status(500).json({
                        message:"get student info err "+err
                    })
                });
    });    

    // app.get all
    app.get("/api/student", passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        db.Student.findAll({})
            .then( student => {
                if(student){
                    res.status(200).json(student);
                }
            })
            .catch(err=> {
                console.log(err);
                return res.status(500).json({
                    message:"get student info err "+err
                })
            });
}); 

app.delete("/api/student/:id", passport.authenticate('jwt',{session:false}),
          (req,res)  =>{

        console.log("student router id",req.params.id);
        db.Student.destroy({
            where:{ id: req.params.id}
        })
        .then( student => {
            if(student){
                console.log("deleted student",student)
                res.status(200).json(student);
            }
        })
        .catch(err=> {
            console.log(err);
            return res.status(500).json({
                message:"delete student info err "+err
            })
        });

    });



};
