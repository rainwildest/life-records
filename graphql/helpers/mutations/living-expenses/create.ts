import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createLivingExpenses } from "db/sql/living-expenses";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { input: LivingExpensesProps & { isAddUserId: boolean } }, _context: unknown): Promise<any> => {
  const { expenseType, expenseName, expenseIcon, isAddUserId = false } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!expenseType || !expenseType) {
    throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption name and type cannot be empty." }));
  }

  let fields: LivingExpensesProps = { expenseType, expenseName, expenseIcon };

  if (isAddUserId) fields = { ...fields, userId: user.id };

  return createLivingExpenses(tanslateSnake(fields));
};
