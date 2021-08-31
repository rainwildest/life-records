import { UserInputError } from "apollo-server-micro";
import { removeLivingExpense } from "db/sql/living-expenses";

export default (_: unknown, args: { id: string }, _context): any => {
  console.log("jsdlkfjs");
  if (!args.id)
    throw new UserInputError("Consumption type information cannot be empty");

  return removeLivingExpense(args.id);
};
