import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import { gitHubInitAuthentication } from "lib/api/initAuthentication";
import middleware from "lib/api/middleware";
import runMiddleware from "lib/api/runMiddleware";
import { setLoginSession } from "lib/api/auth";
import comparison from "lib/api/code-comparison";

initPassport();
gitHubInitAuthentication();

const main = (req: NextApiRequest, res, next) => {
  passport.authenticate("github", async function (err, user) {
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

    (req as passport).logIn(user, function (err) {
      const query = err
        ? `/?to=/login&code=4000&error${err}`
        : `/?to=null&code=2000&error=null`;

      return res.redirect(query);
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
