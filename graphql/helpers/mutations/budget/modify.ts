import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyBudget } from "db/sql/budget";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { id: string; input: CostDetailsProps }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  return modifyBudget(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
