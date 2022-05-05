import { AuthenticationError } from "apollo-server-micro";
import { statisticalFundPlan } from "db/sql/statistical";
import code from "lib/apis/code-comparison";

type FundPlanParam = {
  input: { year: string; expenseId: string };
};

export default async (_parent: unknown, _args: FundPlanParam, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  // "complete"
  return statisticalFundPlan({ userId: user.id, ..._args.input });
};
