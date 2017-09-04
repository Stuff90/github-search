// Get dependencies
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);


app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }),
function(req, res){
});

app.get('/auth/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect(`/search?userId=${req.user.profile.id}`);
});



// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GitHubStrategy({
  clientID: 'ca0c095c5e5d94e57d6e',
  clientSecret: 'cbbfd8f0b68f14624ce1206ce36df6fdec27ced5',
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // return done(err, user);
      // });
    return done(null, {accessToken, refreshToken, profile, done})
  }
));