import { UserInputError } from "apollo-server-micro";
import { createCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { input: CostDetailsOption },
  _context
): any => {
  const { expenseId, expensePrice } = args.input;
  if (!expenseId || !expensePrice)
    throw new UserInputError(
      "Consumption type and consumption amount cannot be empty"
    );

  return createCostDetail(
    tanslateSnake({
      ...args.input,
      userId: "00000000-0000-0000-0000-000000000001",
      purchaseTime: new Date()
    })
  );
};
