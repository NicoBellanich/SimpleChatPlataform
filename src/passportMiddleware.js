import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
require('dotenv').config()
import * as models from './../models'

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_PASSWORD;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      done(null, await models.User.findOne({ where: { id: jwt_payload.id } }));
    } catch (error) {
      done(error);
    }
  })
);

function passportMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    req.user = user;
    next();
  })(req, res, next);
}

export default passportMiddleware;
