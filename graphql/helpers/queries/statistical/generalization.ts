import { AuthenticationError } from "apollo-server-micro";
import { statisticalGeneralization } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import code from "lib/apis/code-comparison";

export default async (_parent: unknown, _args: { year: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  const { year = getCurrentDate("YYYY") } = _args;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  // const year = format(new Date().toISOString(), "YYYY");
  return statisticalGeneralization(user.id, year);
};
