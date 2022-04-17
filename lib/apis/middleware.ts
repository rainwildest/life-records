import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "lib/apis/runMiddleware";
import trustProxy from "lib/apis/trustProxy";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, trustProxy);
  await runMiddleware(req, res, passport.initialize());
};
