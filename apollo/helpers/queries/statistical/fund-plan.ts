import { AuthenticationError } from "apollo-server-micro";
import { statisticalFundPlan } from "db/sql/statistical";

type FundPlanParam = {
  input: { year: string; expenseId: string };
};

export default async (
  _parent: unknown,
  _args: FundPlanParam,
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  // "complete"
  return statisticalFundPlan({ userId: user.id, ..._args.input });
};
