import { AuthenticationError } from "apollo-server-micro";
import { getBudgetsData } from "db/sql/budget";
import { getCurrentDate } from "lib/apis/dayjs";
import { GetBudgetsQueryVariables } from "graphql/model/budget.graphql";

export default (_parent: unknown, args: GetBudgetsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  const props = args.input;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getBudgetsData({ userId: user.id, date: props.date || getCurrentDate("YYYY-MM") });
};
