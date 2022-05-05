import { AuthenticationError } from "apollo-server-micro";
import { getUserLivingExpense } from "db/sql/living-expenses";
import code from "lib/apis/code-comparison";

export default (_parent: unknown, _args: { type: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  const { type = "pay" } = _args;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  return getUserLivingExpense(user?.id || "", type);
};
