import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyFundPlan } from "db/sql/fund-plan";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";
import { MutationModifyFundPlanArgs } from "@graphql-types@";

export default (_: unknown, args: MutationModifyFundPlanArgs, _context: unknown): Promise<any> => {
  const { user } = _context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption record information cannot be empty." }));

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
