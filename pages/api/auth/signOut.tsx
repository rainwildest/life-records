import { NextApiRequest, NextApiResponse } from "next";
import initPassport from "lib/api/initPassport";
import middleware from "lib/api/middleware";
import passport from "passport";
import { removeTokenCookie } from "lib/api/auth-cookies";
initPassport();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  await middleware(req, res);

  (req as passport).logout();
  removeTokenCookie(res);
  return res.end(JSON.stringify({ code: 2000, error: null, data: null }));
};
