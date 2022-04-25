import { AuthenticationError } from "apollo-server-micro";
import { getBudgetsData, getBudgetsTotal } from "db/sql/budget";
import { getCurrentDate } from "lib/apis/dayjs";
import { GetBudgetsQueryVariables } from "graphql/model/budget.graphql";

export default (_parent: unknown, args: GetBudgetsQueryVariables, context: unknown): any => {
  const { user } = context as GraphqlContext;
  const props = args.input;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const date = props?.date || getCurrentDate("YYYY-MM");
  return {
    data: getBudgetsData({ userId: user.id, date }),
    total: getBudgetsTotal({ userId: user.id, date }),
    hadEdit: date === getCurrentDate("YYYY-MM")
  };
};
