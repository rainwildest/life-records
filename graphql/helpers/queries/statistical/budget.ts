import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalBudget } from "db/sql/statistical";
import { format } from "lib/apis/dayjs";
import { autoFormatDate } from "lib/apis/utils";

export default async (_parent: unknown, args: { date: string; format: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }
  const { date = format(new Date().toISOString(), "YYYY-MM") } = args;

  let $format = "";
  if (!args.format) $format = autoFormatDate(date);

  return getStatisticalBudget({
    date,
    userId: user.id,
    format: args.format || $format
  });
};
