import { UserInputError } from "apollo-server-micro";
import { removeCostDetail } from "db/sql/cost-details";

export default (
  _: unknown,
  args: { id: string },
  _context: unknown
): Promise<any> => {
  if (!args.id)
    throw new UserInputError("Consumption record information cannot be empty");

  return removeCostDetail(args.id);
};
