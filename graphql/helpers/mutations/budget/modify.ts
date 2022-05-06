import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyBudget, getBudgetByExceptId } from "db/sql/budget";
import { tanslateSnake } from "lib/apis/utils";
import { getCurrentDate } from "lib/apis/dayjs";
import code from "lib/apis/code-comparison";

export default async (_: unknown, args: { id: string; input: CostDetailsProps }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption record information cannot be empty." }));

  const { expenseId } = args.input;
  const data = await getBudgetByExceptId({ id: args.id, userId: user.id, date: getCurrentDate("YYYY-MM"), expenseId });
  if (data?.id) throw new UserInputError(JSON.stringify({ code: 4001, msg: code["4001"] }));

  return modifyBudget(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
