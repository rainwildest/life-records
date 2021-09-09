import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import { localInitAuthentication } from "lib/api/initAuthentication";
import middleware from "lib/api/middleware";
import runMiddleware from "lib/api/runMiddleware";
import { setLoginSession } from "lib/api/auth";
// import code from 'lib/code-comparison';

initPassport();
localInitAuthentication();

const main = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.end(JSON.stringify({ state: false, error: err.message }));
    }

    /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
    if ((!!user && !user.id && !user.created_at) || !user) {
      return res.end(
        JSON.stringify({
          state: false,
          error: {
            code: 4000
            // message: code['4000']
          }
        })
      );
    }

    // 设置 session
    const session = { ...user };
    await setLoginSession(res, session);

    req.logIn(user, (err) => {
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
