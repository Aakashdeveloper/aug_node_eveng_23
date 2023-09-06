const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const port = 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


app.use(session({
    secret: 'SUPERSECERT',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res) => {
    res.send('<a href="/auth/google">Login With Google</a>')
})


app.get('/error',(req,res) => {
    res.send(`Error While connecting `)
})

app.get('/profile',(req,res) => {
    res.send(userprofile)
})


passport.deserializeUser((user,done) =>{
    done(null,{
        provider:user.provider,
        id:user.provider_id
    })
})

passport.serializeUser((user,cb) =>{
    cb(null,user)
})

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    userprofile = profile;
    return cb(null, userprofile)
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.listen(port,() => {
    console.log(' listening on port '+port)
})