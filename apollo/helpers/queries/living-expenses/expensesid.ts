import { AuthenticationError } from "apollo-server-micro";
import { getLivingExpense } from "db/sql/living-expenses";

export default (_parent: unknown, _args: { id: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getLivingExpense(_args.id);
};
