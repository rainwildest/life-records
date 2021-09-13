import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyLivingExpense } from "db/sql/living-expenses";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { id: string; input: LivingExpensesOption & { isAddUserId: boolean } },
  _context
): any => {
  const { expenseType, expenseName, isAddUserId = false } = args.input;
  const { user } = _context;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  if (!args.id) {
    throw new UserInputError("Consumption type information cannot be empty");
  }

  if (!expenseType || !expenseType) {
    throw new UserInputError("Consumption name and type cannot be empty");
  }

  let fields: LivingExpensesOption = { expenseType, expenseName };

  if (isAddUserId) fields = { ...fields, userId: user.id };
  return modifyLivingExpense(args.id, tanslateSnake(fields));
};