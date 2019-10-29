var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const bcrypt = require('bcryptjs');

const User = require('../model/user');

router.get('/', async (req, res) => {
  User.find().then(user => res.json(user))
});

router.post('/register', async (req, res, next) => {
  //Checking already account


  //Hash password


  const { username, password } = req.body;
  const user = new User({ username, password });

  User.findOne({ username: req.body.username })
    .then(exist => {
      if (!exist) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash
          user.save()
            .then(user => {
              res.json({ status: user.username + ' registered!' })
            })
            .catch(err => {
              res.send('error' + err);
            })

        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })


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

