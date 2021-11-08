import { UserInputError } from "apollo-server-micro";
import { removeFundPlan } from "db/sql/fund-plan";

export default (
  _: unknown,
  args: { id: string },
  _context: unknown
): Promise<any> => {
  if (!args.id)
    throw new UserInputError("Consumption record information cannot be empty.");

  return removeFundPlan(args.id);
};
