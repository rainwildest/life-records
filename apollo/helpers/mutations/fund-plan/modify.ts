import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyFundPlan } from "db/sql/fund-plan";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { id: string; input: any },
  _context: unknown
): Promise<any> => {
  const { user } = _context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }
  if (!args.id) {
    throw new UserInputError("Consumption record information cannot be empty.");
  }

  const fields = { ...args.input };
  if (fields.completeAt) fields["completeAt"] = new Date().toISOString();

  return modifyFundPlan(
    args.id,
    tanslateSnake({
      ...fields,
      modifiedAt: new Date()
    })
  );
};
