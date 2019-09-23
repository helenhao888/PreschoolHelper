// const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const db = require("../models");
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;    

module.exports = passport => {

    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) =>{
        db.User.findOne({
                   where :{id: jwtPayload.id}
        })
        .then(user =>{
            if(user){
                return done(null,user)
            }
            return done(null,false);

        })  
        .catch(err =>{
            console.log("find user err",err);
                return done(err, false);

        }) 
                
   
    }));
}
