const passport = require('passport');
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  // let u = passport.authenticate('github', { scope: [ 'user:email' ] }, () => {
  //   console.log('cb');
  // });

  // console.log(u);

  res.json({api: 'works'});

});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

module.exports = router;