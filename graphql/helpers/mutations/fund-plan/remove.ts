import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { removeFundPlan } from "db/sql/fund-plan";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { id: string }, _context: unknown): Promise<any> => {
  const { user } = _context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption record information cannot be empty." }));

  return removeFundPlan(args.id);
};
