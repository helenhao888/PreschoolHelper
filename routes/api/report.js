const db = require("../../models");
const passport = require("passport");

module.exports = function (app) {

    app.get("/api/report/:date", passport.authenticate('jwt',{session:false}),
          (req,res)=>{
              
            //   console.log("server req body",req);
              console.log("server req body",req.user.dataValues.studentId);
           const {date} = req.params;

        db.Student.findOne({
            where:{id:req.user.dataValues.studentId}
        })
            .then( student => {
                if(student){
                    console.log("student class",student.classId);
                    
                    db.Activities.findAll({
                        where:{
                            activityDate: date
                        }
                    })
                    .then (activity=>{
                        console.log("activity",activity);
                        res.status(200).json({
                            report: activity,
                            student:student
                        });
                    })
                    .catch (err=>{
                        console.log("server err",err)
                        return res.status(500).json({
                            message:"get activity report error "+err
                        })
                    })
                }
            })
            .catch(err=> {
                console.log("get stu err",err);
                return res.status(500).json({
                    message:"get student info err "+err
                })
            });
})


};