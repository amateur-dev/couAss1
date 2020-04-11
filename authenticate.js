var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // this will handle the sessions of our users
passport.deserializeUser(User.deserializeUser()); // this will handle the sessions of our users