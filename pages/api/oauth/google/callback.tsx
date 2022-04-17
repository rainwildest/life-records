import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/apis/initPassport";
import { googleInitAuthentication } from "lib/apis/initAuthentication";
import middleware from "lib/apis/middleware";
import runMiddleware from "lib/apis/runMiddleware";
import trustProxy from "lib/apis/trustProxy";
import comparison from "lib/apis/code-comparison";
import { setLoginSession } from "lib/apis/auth";

initPassport();
googleInitAuthentication();

const main = (req, res, next) => {
  const url = new URL(`${req.protocol}://${req.hostname}`);
  url.pathname = "/api/oauth/google/callback";

  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
      prompt: "select_account",
      callbackURL: url.toString()
    },
    async function (err, user) {
      if (err) {
        const query = `/?to=/login&code=${err.code}&error=${err.error}`;
        return res.redirect(query);
      }

      if (!user) {
        const query = `/?to=/login&code=4003&error=${comparison["4003"]}`;
        return res.redirect(query);
      }

      // 设置 session
      const session = { ...user };
      await setLoginSession(res, session);

      req.logIn(user, function (err) {
        const query = err ? `/?to=/login&code=4000&error${err}` : `/?to=null&code=2000&error=null`;

        return res.redirect(query);
      });
    }
  )(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, trustProxy);
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
