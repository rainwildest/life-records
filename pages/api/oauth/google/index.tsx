import passport from "passport";
import { URL } from "url";
import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/apis/initPassport";
import { googleInitAuthentication } from "lib/apis/initAuthentication";
import middleware from "lib/apis/middleware";
import runMiddleware from "lib/apis/runMiddleware";
import trustProxy from "lib/apis/trustProxy";

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

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, trustProxy);
  await middleware(req, res);
  await runMiddleware(req, res, main);
};
