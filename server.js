// ******************************************************************************
// *** Dependencies
// =============================================================
const keys = require("./config/keys.js");
require("dotenv").config();
const express = require("express");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for flash message
app.use(flash());

// Requiring our models for syncing
const db = require("./models");

// Static directory
app.use(express.static("public"));

//For passport
// app.use(session({ secret: keys.expSession.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// app.use(passport.session());

// Routes
// =============================================================
const authRoute = require('./routes/api/auth.js')(app);
const studentRoute = require('./routes/api/student.js')(app);
const activityRoute = require('./routes/api/activityRoute.js')(app);
const reportRoute = require('./routes/api/report.js')(app);

//Load passport strategies
require('./config/passport.js')(passport);

//Load passport google strategies
require('./config/passport-oauth2.js')(passport, db.User);


// Syncing our sequelize models and then starting our Express app
// =============================================================


db.sequelize.sync({}).then(() => {

  if(process.env.NODE_ENV === 'production'){
     app.use(express.static('client/build'));

     app.get("*",(req,res) =>{
       res.sendFile(
       path.resolve(__dirname,'client','build','index.html')
       );
     })
  }
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  }) ;
})
.catch(error =>{
  console.log("server catch err",error);
});

