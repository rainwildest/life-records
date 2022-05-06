import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createBudget, getBudgetByDateAndExpense } from "db/sql/budget";
import { tanslateSnake } from "lib/apis/utils";
import { getCurrentDate } from "lib/apis/dayjs";
import code from "lib/apis/code-comparison";

export default async (_: unknown, args: { input: CostDetailsProps }, context: unknown): Promise<any> => {
  const { expenseId, amounts } = args.input;
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!expenseId || !amounts) {
    throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption type and consumption amounts cannot be empty." }));
  }

  const data = await getBudgetByDateAndExpense({ userId: user.id, date: getCurrentDate("YYYY-MM"), expenseId });
  if (data?.id) throw new UserInputError(JSON.stringify({ code: 4001, msg: code["4001"] }));

  return createBudget(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
