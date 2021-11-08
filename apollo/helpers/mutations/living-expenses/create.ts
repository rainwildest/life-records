import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createLivingExpenses } from "db/sql/living-expenses";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { input: LivingExpensesOptions & { isAddUserId: boolean } },
  _context: unknown
): Promise<any> => {
  const { expenseType, expenseName, isAddUserId = false } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  if (!expenseType || !expenseType) {
    throw new UserInputError("Consumption name and type cannot be empty.");
  }

  let fields: LivingExpensesOptions = { expenseType, expenseName };

  if (isAddUserId) fields = { ...fields, userId: user.id };
  return createLivingExpenses(tanslateSnake(fields));
};
