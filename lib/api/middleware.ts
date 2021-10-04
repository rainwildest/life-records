import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "lib/api/runMiddleware";
import trustProxy from "lib/api/trustProxy";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await runMiddleware(req, res, trustProxy);
  await runMiddleware(req, res, passport.initialize());
};
