import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import initPassport from 'lib/api/initPassport';
import { localInitAuthentication } from 'lib/api/initAuthentication';
import middleware from 'lib/api/middleware';
import runMiddleware from 'lib/api/runMiddleware';
import { addUserBySignUp } from 'db/sql/users';

initPassport();
localInitAuthentication(true);

const main = (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) {
      return res.end(JSON.stringify({ state: false, error: err }));
    };
    console.log('798798', req.body);

    /* 新增用户 */
    const signUpUser = await addUserBySignUp(req.body);

    /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
    if ((!!signUpUser && !signUpUser.id && !signUpUser.created_at) || !signUpUser) {
      return res.end(JSON.stringify({ state: false, error: (err || null) }));
    }

    user = signUpUser;

    /* 登录新添加的用户 */
    req.logIn(user, function (err) {
      if (err) {
        return next(err); 
      }
      return res.end(JSON.stringify({ state: true }));
    });
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
