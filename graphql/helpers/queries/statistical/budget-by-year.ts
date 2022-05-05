import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalBudgetByYear } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import { QueryStatisticalBudgetByYearArgs } from "@graphql-types@";
import code from "lib/apis/code-comparison";

export default async (_parent: unknown, args: QueryStatisticalBudgetByYearArgs, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  const { date = getCurrentDate("YYYY") } = args;

  return getStatisticalBudgetByYear({
    date,
    userId: user.id
  });
};
