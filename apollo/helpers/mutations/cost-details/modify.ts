import { UserInputError } from "apollo-server-micro";
import { modifyCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { id: string; input: CostDetailsOptions },
  _context
): any => {
  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty");
  }

  return modifyCostDetail(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
