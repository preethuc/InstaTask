const JWTStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
const User = require('../Models/userModel')
const passport = require('passport')

opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret-secret'

passport.use(new JWTStrategy(opts, (jwt_payload, result) => {
    User.findOne({ _id: jwt_payload.id }, (err, user) => {
        if (err) {
            return result(err,false)
        }
        if (user) {
            return result(null,user)
        }else{
            return result(null,false)
        }

    })
}))