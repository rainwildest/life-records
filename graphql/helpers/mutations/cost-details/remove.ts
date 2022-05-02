import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { removeCostDetail } from "db/sql/cost-details";

export default (_: unknown, args: { id: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  return removeCostDetail(args.id);
};
