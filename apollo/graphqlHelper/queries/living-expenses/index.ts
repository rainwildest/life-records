import { AuthenticationError } from "apollo-server-micro";
import { getUserLivingExpense } from "db/sql/living-expenses";

export default (_parent, _args, context): any => {
  const { user } = context;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  return getUserLivingExpense(user?.id || "");
};
