import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createFundPlan } from "db/sql/fund-plan";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";
import { MutationCreateFundPlanArgs } from "@graphql-types@";

export default (_: unknown, args: MutationCreateFundPlanArgs, _context: unknown): Promise<any> => {
  const { name, expenseId, amounts, approximateAt } = args.input;
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  if (!expenseId || !amounts || !approximateAt || !name) {
    throw new UserInputError(JSON.stringify({ code: 4000, msg: "必填内容不可为空" }));
  }

  return createFundPlan(
    tanslateSnake({
      ...args.input,
      userId: user.id
    })
  );
};
