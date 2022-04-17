import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { input: CostDetailsOptions }, _context: unknown): Promise<any> => {
  const { expenseId, amounts } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
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
