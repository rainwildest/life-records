import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/apis/initPassport";
import { localInitAuthentication } from "lib/apis/initAuthentication";
import middleware from "lib/apis/middleware";
import runMiddleware from "lib/apis/runMiddleware";
import { setLoginSession } from "lib/apis/auth";
import codeComparison from "lib/apis/code-comparison";

initPassport();
localInitAuthentication();

let token = null;
const main = (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) return res.end(JSON.stringify({ ...err }));

    /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
    if ((!!user && !user.id) || !user) {
      return res.end(JSON.stringify({ code: 4002, data: null, error: codeComparison[4002] }));
    }

    try {
      // 设置 session
      const session = { ...user };
      token = await setLoginSession(res, session);
    } catch (error) {
      return res.end(JSON.stringify({ code: 4000, data: null, error }));
    }

    req.logIn(user, (err) => {
      const info = err ? { code: 4000, data: null, error: err } : { code: 2000, data: { token }, error: null };

      return res.end(JSON.stringify(info));
    });
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
