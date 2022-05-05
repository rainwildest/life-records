import { AuthenticationError } from "apollo-server-micro";
import { getBudgetsData, getBudgetsTotal } from "db/sql/budget";
import { getCurrentDate } from "lib/apis/dayjs";
import { GetBudgetsQueryVariables } from "graphql/model/budget.graphql";
import code from "lib/apis/code-comparison";

export default (_parent: unknown, args: GetBudgetsQueryVariables, context: unknown): any => {
  const { user } = context as GraphqlContext;
  const props = args.input;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  const date = props?.date || getCurrentDate("YYYY-MM");
  return {
    data: getBudgetsData({ userId: user.id, date }),
    total: getBudgetsTotal({ userId: user.id, date }),
    hadEdit: date === getCurrentDate("YYYY-MM")
  };
};
