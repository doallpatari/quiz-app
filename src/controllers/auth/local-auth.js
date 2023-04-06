const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../../dal/models/user.model")
const validateRegister = require("../middleware/validation/register")




passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { 
        // console.log(`${email}`)
        // console.log(`${user}`)
        // console.log("in pass")
        return done(null, false); 
        
      }
      return done(null, user);
    });
    // return (done, true)
  }
));
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      newUser
      .save()
      .then(res.redirect('/login'))
      .catch(err => console.log(err))
    }
  })
})

// router.post('/login', passport.authenticate('local'), function(req, res) {
//   res.redirect(req.session.returnTo || '/');
//   delete req.session.returnTo;
// });
router.post('/login', (req, res, next) => {
  // authentication like normal
  passport.authenticate('local',(err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) { 
      return res.redirect('/login?info=' + info); 
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      // setUserCookie(req, res);      // this is the special part
      // redirect the user to the session cookie if it exists
      var redirectTo = req.session.redirectTo || '/auth/email/success';
      // delete the session cookie so it is not present on the next request
      delete req.session.redirectTo;
      // redirecting the user to where they want to go
      res.redirect(redirectTo || '/');
    });

  })(req, res, next);
});

router.get('/success', async (req, res) => {
  if(req.session){
  const userInfo = {
    id: req.session.passport.user.email,
    displayName: req.session.passport.user.name,
    provider: req.session.passport.user.provider,
  };
  res.render('fb-github-success', { user: userInfo });
}
else{
  res.redirect('/login')
}
});

router.get('/error', (req, res) => res.send('Error logging in via Email..'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.render('home');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out email user' });
  }
});

module.exports = router;








