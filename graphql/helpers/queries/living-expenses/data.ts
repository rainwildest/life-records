import { AuthenticationError } from "apollo-server-micro";
import { getUserLivingExpense } from "db/sql/living-expenses";

export default (
  _parent: unknown,
  _args: { type: string },
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;
  const { type = "pay" } = _args;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  return getUserLivingExpense(user?.id || "", type);
};
