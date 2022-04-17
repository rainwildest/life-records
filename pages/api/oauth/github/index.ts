import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "lib/apis/runMiddleware";
import initPassport from "lib/apis/initPassport";
import { gitHubInitAuthentication } from "lib/apis/initAuthentication";
import middleware from "lib/apis/middleware";

initPassport();
gitHubInitAuthentication();

const main = (req, res, next) => {
  // const url = new URL(`${req.protocol}:${req.hostname}`);

  passport.authenticate("github", {
    scope: ["user"]
    // callbackURL: url.toString()
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
