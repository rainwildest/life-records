import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createFundPlan } from "db/sql/fund-plan";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { input: any }, _context: unknown): Promise<any> => {
  const { expenseId, amounts } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  if (!expenseId || !amounts) {
    throw new UserInputError("Consumption type and consumption amounts cannot be empty.");
  }

  return createFundPlan(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
