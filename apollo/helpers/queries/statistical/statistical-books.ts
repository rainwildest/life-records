import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { statisticalCostByBooks } from "db/sql/statistical";

export default (
  _parent: unknown,
  _args: { bookId: string },
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  if (!_args?.bookId) {
    throw new UserInputError("Account book information cannot be blank.");
  }

  return statisticalCostByBooks(user.id, _args.bookId);
};
