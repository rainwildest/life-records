import { AuthenticationError } from "apollo-server-micro";
import { getBudgetById } from "db/sql/budget";
import code from "lib/apis/code-comparison";

export default (_parent: unknown, args: { id: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  return getBudgetById(args.id);
};
