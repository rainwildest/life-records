import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createLivingExpenses } from "db/sql/living-expenses";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { input: LivingExpensesProps & { isAddUserId: boolean } }, _context: unknown): Promise<any> => {
  const { expenseType, expenseName, expenseIcon, isAddUserId = false } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  if (!expenseType || !expenseType) {
    throw new UserInputError("Consumption name and type cannot be empty.");
  }

  let fields: LivingExpensesProps = { expenseType, expenseName, expenseIcon };

  if (isAddUserId) fields = { ...fields, userId: user.id };
  return createLivingExpenses(tanslateSnake(fields));
};
