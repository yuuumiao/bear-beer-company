const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt"); // lib to encrypt data
const saltRounds = 10;


//////////// S I G N U P ///////////

// .get() route ==> to display the signup form to users
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup");
});


// .post() route ==> finish the signup and redirect to the homepage
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
 
  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      return UserModel.create({
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/');
    })
    .catch(error => next(error));
});



//////////// L O G I N ///////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
 
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {  
        console.log("passed", user);
        res.render('profile', { user });
        // res.redirect("/")
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});
 



 //////////// S I G N O U T ///////////
 
router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here
    // console.log(req.session.currentUser);
    res.redirect("/auth/login");
  });
});

module.exports = router;
