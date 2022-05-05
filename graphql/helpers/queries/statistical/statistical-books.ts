import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { statisticalCostByBooks } from "db/sql/statistical";
import { GetStatisticalBooksQueryVariables } from "graphql/model/statistics.graphql";
import _ from "lodash";
import code from "lib/apis/code-comparison";

export default (parent: unknown, args: GetStatisticalBooksQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  if (!args.input?.bookId) throw new UserInputError("Account book information cannot be blank.");

  const params = args.input;
  const fields: any = {};

  _.keys({ ...(params || {}) }).forEach((key) => {
    if (params[key]) fields[key] = params[key];
  });

  return statisticalCostByBooks({ userId: user.id, ...fields });
};
