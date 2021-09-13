import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { input: CostDetailsOptions },
  _context
): any => {
  const { expenseId, expensePrice } = args.input;
  const { user } = _context;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  if (!expenseId || !expensePrice) {
    throw new UserInputError(
      "Consumption type and consumption amount cannot be empty"
    );
  }

  return createCostDetail(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
