import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyCostDetail } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { id: string; input: CostDetailsProps }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError(JSON.stringify({ code: 4000, msg: "Consumption record information cannot be empty." }));

  return modifyCostDetail(
    args.id,
    tanslateSnake({
      ...args.input,
      modifiedAt: new Date()
    })
  );
};
