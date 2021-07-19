import passport from 'passport';
import { URL } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from 'lib/api/runMiddleware';
import initPassport from 'lib/api/initPassport';
import { gitHubInitAuthentication } from 'lib/api/initAuthentication';
import middleware from 'lib/api/middleware';

initPassport();
gitHubInitAuthentication();

const main = (req, res, next) => {
  // const url = new URL(`${req.protocol}:${req.hostname}`);

  passport.authenticate('github', {
    scope: [ 'user' ]
    // callbackURL: url.toString()
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
