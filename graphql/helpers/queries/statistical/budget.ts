import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalBudget } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import { autoFormatDate } from "lib/apis/utils";
import { GetStatisticalBudgetQueryVariables } from "graphql/model/statistics.graphql";

export default async (_parent: unknown, args: GetStatisticalBudgetQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }
  const { date = getCurrentDate("YYYY-MM") } = args.input;

  const params = args.input;

  let $format = "";
  if (!params.format) $format = autoFormatDate(date);

  return getStatisticalBudget({
    date,
    userId: user.id,
    format: params.format || $format,
    groupFormat: "YYYY-MM"
  });
};
