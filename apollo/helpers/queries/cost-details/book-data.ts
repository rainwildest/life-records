import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { getCostDetails } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  _args: { bookId: string },
  context: unknown
): Promise<any> => {
  const { bookId } = _args;
  const { user } = context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }
  if (!bookId) {
    throw new UserInputError("Account book information cannot be blank.");
  }

  return getCostDetails(tanslateSnake({ userId: user?.id, bookId }));
};
