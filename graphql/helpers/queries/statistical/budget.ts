import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalBudget, getClassificationBudgetByYear } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import { autoFormatDate } from "lib/apis/utils";
import { GetStatisticalBudgetQueryVariables } from "graphql/model/statistics.graphql";
import code from "lib/apis/code-comparison";

export default async (_parent: unknown, args: GetStatisticalBudgetQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  const { date = getCurrentDate("YYYY-MM") } = args.input;

  const params = args.input;
  let $format = params.format;

  if (!$format) $format = autoFormatDate(date);

  const $fun = $format.length > 4 ? getStatisticalBudget : getClassificationBudgetByYear;
  return $fun({ date, userId: user.id });
};
