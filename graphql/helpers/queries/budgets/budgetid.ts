import { AuthenticationError } from "apollo-server-micro";
import { getBudgetById } from "db/sql/budget";

export default (_parent: unknown, args: { id: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getBudgetById(args.id);
};
