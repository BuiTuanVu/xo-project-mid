const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const User = require('../model/user');
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, cb) => {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return await User.findOne({ username: username })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        return cb(null, user, { message: 'Logged in Successfully.' });
                    }
                    else {
                        return cb(null, false, { message: 'Incorrect username or password.' });
                    }
                }
                else {
                    return cb(null, false, { message: 'Username doest not exist.' });
                }
                // if (!user) {
                //     return cb(null, false, { message: 'Incorrect email or password.' });
                // }
                // return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'wow'
},
    function (jwtPayload, cb) {
        //find the user in db if needed
        return User.findOne({ username: jwtPayload.user.username })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));