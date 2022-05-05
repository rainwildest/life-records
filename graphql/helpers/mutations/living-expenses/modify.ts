import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyLivingExpense } from "db/sql/living-expenses";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (
  _: unknown,
  args: { id: string; input: LivingExpensesProps & { isAddUserId: boolean } },
  _context: unknown
): Promise<any> => {
  const { expenseType, expenseName, expenseIcon, isAddUserId = false } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  if (!args.id) {
    throw new UserInputError("Consumption type information cannot be empty.");
  }

  if (!expenseType || !expenseType) {
    throw new UserInputError("Consumption name and type cannot be empty.");
  }

  let fields: LivingExpensesProps = { expenseType, expenseName, expenseIcon };

  if (isAddUserId) fields = { ...fields, userId: user.id };
  return modifyLivingExpense(args.id, tanslateSnake(fields));
};
