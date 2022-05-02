import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { id: string; bookId: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  return modifyCostDetail(args.id, tanslateSnake({ bookId: args.bookId || null }));
};
