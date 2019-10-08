const db = require("../../models");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const path = require("path");
const multer = require("multer");


module.exports = function (app) {

const storage = multer.diskStorage({
    destination: "client/public/image/",
    filename: function(req, file, cb){
       cb(null,"image-" + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).single("myImage");


  app.post("/upload",  passport.authenticate('jwt',{session:false}), upload,(req, res, err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    // add save file name to database
    res.send(req.file);
    if(!err)
       return res.status(200).json({
           fileName:req.file.path
       }).end();
 });

}