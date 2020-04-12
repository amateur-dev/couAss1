var passport = require('passport');
const {LocalStrategy , JwtStrategy } = require('passport-local').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import * as jsonwebtoken from 'jsonwebtoken';




// var User = require('./models/users');

// exports.local = passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser()); // this will handle the sessions of our users
// passport.deserializeUser(User.deserializeUser()); // this will handle the sessions of our users

console.log(jsonwebtoken);