import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/apis/initPassport";
import { localInitAuthentication } from "lib/apis/initAuthentication";
import middleware from "lib/apis/middleware";
import runMiddleware from "lib/apis/runMiddleware";
import { addUserBySignUp } from "db/sql/users";
import { setLoginSession } from "lib/apis/auth";

initPassport();
localInitAuthentication(true);

let token = null;
const main = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) return res.end(JSON.stringify({ ...err }));

    try {
      /* 新增用户 */
      user = await addUserBySignUp(req.body);

      /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
      if ((!!user && !user.id) || !user) {
        return res.end(JSON.stringify({ code: 4000, data: null, error: err || null }));
      }
    } catch (err) {
      return res.end(JSON.stringify({ code: 4000, data: null, error: err || null }));
    }

    try {
      // 设置 session
      const session = { ...user };
      token = await setLoginSession(res, session);
    } catch (error) {
      return res.end(JSON.stringify({ code: 4000, data: null, error }));
    }

    /* 登录新添加的用户 */
    req.logIn(user, function (err) {
      const info = err ? { code: 4000, data: null, error: err } : { code: 2000, data: { token }, error: null };

      return res.end(JSON.stringify(info));
    });
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
