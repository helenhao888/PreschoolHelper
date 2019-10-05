const db = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = function (app) {


    app.post("/api/activity", (req,res)  =>{

       const {activityDate,activityName,activityTime,description,classId} = req.body;

        const newActivity = {
            activityDate,
            activityTime,
            activityName,
            description,           
            classId   
        };

        db.Activity.create(newActivity)
        .then(activity=>{
            console.log("activity",activity);
            res.status(200).json({
                activity:"activity created successfully",
                activityCreated: true
            })
        })
        .catch(err => {
            console.log("db create err",err);
            res.status(500).json({
                activity: "activity created with err " + err
            })
        })    


    });

    app.put("/api/Activity/:id", passport.authenticate('jwt',{session:false}),
            (req,res)=>{

        db.Activity.update(
            req.body,
            {where: {id:req.params.id}})
            .then( activity => {
                if(activity){
                    res.status(200).json({
                        activity:"activity updated successfully",
                        activityUpdated: true
                    });
                }
            })
            .catch(err=> {
                console.log(err);
                return res.status(500).json({
                    message:"update activity info err "+err
                })
            });
    });


    app.get("/api/activity/:id", passport.authenticate('jwt',{session:false}),
        (req,res)=>{
            db.Activity.findOne({where: {id:req.params.id}})
                .then( activity => {
                    if(activity){
                        res.status(200).json(activity);
                    }
                })
                .catch(err=> {
                    console.log(err);
                    return res.status(500).json({
                        message:"get activity info err "+err
                    })
                });
    });    

    // app.get all
    app.get("/api/activity", passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        db.Activity.findAll({
            order:[
                ['activityDate','DESC'],
                ['activityTime','DESC']
            ]
        })
            .then( activity => {
                if(activity){
                    res.status(200).json(activity);
                }
            })
            .catch(err=> {
                console.log(err);
                return res.status(500).json({
                    message:"get activity info err "+err
                })
            });
}); 

app.delete("/api/activity/:id", passport.authenticate('jwt',{session:false}),
          (req,res)  =>{

        console.log("activity router id",req.params.id);
        db.Activity.destroy({
            where:{ id: req.params.id}
        })
        .then( activity => {
            if(activity){
                console.log("deleted activity",activity)
                res.status(200).json(activity);
            }
        })
        .catch(err=> {
            console.log(err);
            return res.status(500).json({
                message:"delete activity info err "+err
            })
        });

    });



};
