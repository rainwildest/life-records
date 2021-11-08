import { UserInputError } from "apollo-server-micro";
import { modifyFundPlan } from "db/sql/fund-plan";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { id: string; input: any },
  _context: unknown
): Promise<any> => {
  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  return modifyFundPlan(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
