import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createBudget } from "db/sql/budget";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { input: CostDetailsOptions }, context: unknown): Promise<any> => {
  const { expenseId, amounts } = args.input;
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  if (!expenseId || !amounts) {
    throw new UserInputError("Consumption type and consumption amounts cannot be empty.");
  }

  return createBudget(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
