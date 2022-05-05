import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { input: CostDetailsProps }, context: unknown): Promise<any> => {
  const { expenseId, amounts } = args.input;
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  if (!expenseId || !amounts) {
    throw new UserInputError("Consumption type and consumption amounts cannot be empty.");
  }

  return createCostDetail(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
