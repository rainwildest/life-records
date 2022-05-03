import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalBudgetByYear } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import { QueryStatisticalBudgetByYearArgs } from "@graphql-types@";

export default async (_parent: unknown, args: QueryStatisticalBudgetByYearArgs, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError("Authentication token is invalid, please log in.");

  const { date = getCurrentDate("YYYY") } = args;

  return getStatisticalBudgetByYear({
    date,
    userId: user.id
  });
};
