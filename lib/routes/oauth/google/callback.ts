import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import initPassport from 'lib/api/initPassport';
import { googleInitAuthentication } from 'lib/api/initAuthentication';
import middleware from 'lib/api/middleware';
import runMiddleware from 'lib/api/runMiddleware';
import trustProxy from 'lib/api/trustProxy';

initPassport();
googleInitAuthentication();

const main = (req, res, next) => {
  const url = new URL(`${req.protocol}://${req.hostname}`);
  url.pathname = '/api/oauth/google/callback';

  passport.authenticate('google', {
    scope: [ 'email', 'profile' ],
    prompt: 'select_account'
    // callbackURL: url.toString()
  }, function (err, user, info) {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.redirect('/login'); 
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err); 
      }
      return res.redirect('/personal-info');
    });
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, trustProxy);
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
