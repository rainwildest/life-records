import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from 'lib/api/runMiddleware';
// import session from 'lib/api/session';
// import trustProxy from 'lib/api/trustProxy';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // await runMiddleware(req, res, trustProxy);
  // await runMiddleware(req, res, session);
  await runMiddleware(req, res, passport.initialize());
  await runMiddleware(req, res, passport.session());
};
