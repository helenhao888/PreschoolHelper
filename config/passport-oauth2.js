module.exports = function (passport, user){

const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys.js");
var User = user;

//For google strategy
passport.use(
    new GoogleStrategy({
      callbackURL: '/auth/google/redirect',  //same as set in goole
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },(accessToken,refreshToken,profile,done) => {
      //passport callback function
      console.log("profile",profile);
      console.log("passport callback function fired");
      console.log("access token",accessToken);
      console.log("refresh token",refreshToken);
      
      //check if this google id has been stored in user table
      User.findOne({
        where: {
            googleId: profile.id
        }
        }).then(function(user){
         
          if ( user){
              console.log("That user exists",user);
              return done(null, user);           
          } else {
              console.log("new user");
              var data = {
                email: "google",
                password: "",
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                userName: profile.displayName,
                googleId: profile.id
                };
                console.log("data",data);

              User.create(data).then(function(newUser,created){
                       
                if (!newUser){
                    return done (null,false,{message:"create user fails"});  
                 }
                if (newUser) {
                    return done(null, newUser)
                }   
                })
                .catch(function(err){
                    console.log("when create new user , err",err);
                    return done (null, false, {message : err});
                });
          }    
       })

    }

))

}