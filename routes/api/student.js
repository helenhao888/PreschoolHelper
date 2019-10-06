const db = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const path = require("path");
const multer = require("multer");

module.exports = function (app) {

    const storage = multer.diskStorage({
        destination: "./public/uploads/",
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
      });
      
      const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
      }).single("myImage");

    //   var upload = multer({ dest: 'uploads/' })


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

    app.put("/api/student/:id", passport.authenticate('jwt',{session:false}),
            (req,res)=>{

        db.Student.update(
            req.body,
            {where: {id:req.params.id}})
            .then( student => {
                if(student){
                    res.status(200).json({
                        student:"student updated successfully",
                        studentUpdated: true
                    });
                }
            })
            .catch(err=> {
                console.log(err);
                return res.status(500).json({
                    message:"update student info err "+err
                })
            });
    });


    app.get("/api/student/:id", passport.authenticate('jwt',{session:false}),
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
    //  
    // app.post('/upload',upload.single('avatar'), function (req, res, next) {
    //     // console.log("post upload",req.file)
    //     res.send(req.file);

    // });

    // app.post("/upload", function (req,res){
    //     console.log("post upload",req.body)
    //     upload(req, res, function(err)  {
    //        console.log("Request ---", req.body);
    //        console.log("Request file ---", req.file);//Here you get file.
    //        /*Now do where ever you want to do*/
    //        if(!err)
    //           return res.send(200).end();
    //     });
    //  });

    app.post("/upload",  upload,(req, res, err) => {
           console.log("Request ---", req.body);
           console.log("Request file ---", req.file);//Here you get file.
           /*Now do where ever you want to do*/
           res.send(req.file);
           if(!err)
              return res.send(200).end();
        });
     

};
