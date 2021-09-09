import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import middleware from "lib/api/middleware";
import passport from "passport";
initPassport();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await middleware(req, res);

  (req as passport).logout();
  return res.end(JSON.stringify({ state: true }));
};
