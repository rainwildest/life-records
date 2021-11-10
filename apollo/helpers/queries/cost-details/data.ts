import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { getCostDetails } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  _args: { input: { userId: string; bookId: string } },
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  return getCostDetails(
    tanslateSnake({ userId: user.id, ...(_args.input || {}) })
  );
};
