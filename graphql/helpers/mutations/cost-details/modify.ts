import { UserInputError } from "apollo-server-micro";
import { modifyCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { id: string; input: CostDetailsProps }, _context: unknown): Promise<any> => {
  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  return modifyCostDetail(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
