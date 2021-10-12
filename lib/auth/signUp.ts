import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import { localInitAuthentication } from "lib/api/initAuthentication";
import middleware from "lib/api/middleware";
import runMiddleware from "lib/api/runMiddleware";
import { addUserBySignUp } from "db/sql/users";
import { setLoginSession } from "lib/api/auth";

initPassport();
localInitAuthentication(true);

let token = null;
const main = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.end(JSON.stringify({ code: 4001, data: null, error: err }));
    }

    /* 新增用户 */
    user = await addUserBySignUp(req.body);

    /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
    if (!!user && !user.id && !user.created_at) {
      return res.end(
        JSON.stringify({ code: 4000, data: null, error: err || null })
      );
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
      if (err) return next(err);

      return res.end(
        JSON.stringify({ code: 2000, data: { token }, error: null })
      );
    });
  })(req, res, next);
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
