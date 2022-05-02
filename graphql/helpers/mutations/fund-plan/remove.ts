import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { removeFundPlan } from "db/sql/fund-plan";

export default (_: unknown, args: { id: string }, _context: unknown): Promise<any> => {
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }
  if (!args.id) throw new UserInputError("Consumption record information cannot be empty.");

  return removeFundPlan(args.id);
};
