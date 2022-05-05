import { AuthenticationError } from "apollo-server-micro";
import { getLivingExpense } from "db/sql/living-expenses";
import code from "lib/apis/code-comparison";

export default (_parent: unknown, _args: { id: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  return getLivingExpense(_args.id);
};
