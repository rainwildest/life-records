import passport from "passport";
import { format, URL } from "url";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import { googleInitAuthentication } from "lib/api/initAuthentication";
import middleware from "lib/api/middleware";
import runMiddleware from "lib/api/runMiddleware";
import trustProxy from "lib/api/trustProxy";

initPassport();
googleInitAuthentication();

const main = (req, res, next) => {
  const url = new URL(`${req.protocol}://${req.hostname}`);
  url.pathname = "/api/oauth/google/callback";

  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
    callbackURL: url.toString()
  })(req, res, next);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, trustProxy);
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
