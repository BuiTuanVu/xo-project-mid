var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');


const User = require('../model/user');

router.get('/', async (req, res) => {
  User.find().then(user => res.json(user))
});

router.post('/register', async (req, res, next) => {
  //Checking already account
  const nameExist = await User.findOne({ username: req.body.username });
  if (nameExist) return res.status(400).send('Account already exist');

  //Hash password


  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
})


/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ user }, 'wow');
      return res.json({ msg: 'Login success!', user, token });
    });
  })(req, res);
});


module.exports = router;

