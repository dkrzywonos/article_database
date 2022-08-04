const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const validPassword = require('../lib/passwordUtils').validPassword;
const User = connection.models.User;


const strategy = new LocalStrategy({
  usernameField: 'emailLogin',
  passwordField: 'passwordLogin'
},function(email, password, done){
  User.findOne({email: email})
              .then((user)=>{
                if (!user) {
                     return done(null, false);
                 }
                const isValid = validPassword(password, user.hash, user.salt)

                if (isValid){
                  return done(null, user);
                }else{
                  return done(null, false);
                }
  })
  .catch((err)=>{
    done(err);
  })
})

passport.use(strategy);

passport.serializeUser((user, done)=>{
  done(null,user.id);
})

passport.deserializeUser((userId, done)=>{
  User.findById(userId)
    .then((user)=>{
      done(null,user);
    })
    .catch(err=> done(err))
})
