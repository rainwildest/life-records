import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/apis/initPassport";
import middleware from "lib/apis/middleware";
import passport from "passport";
import { removeTokenCookie } from "lib/apis/auth-cookies";
initPassport();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  await middleware(req, res);

  (req as passport).logout();
  removeTokenCookie(res);

  return res.end(JSON.stringify({ code: 2000, msg: null, data: null }));
};
