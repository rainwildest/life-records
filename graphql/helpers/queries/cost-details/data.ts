import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { getCostDetails } from "db/sql/cost-details";
import { tanslateSnake } from "lib/apis/utils";
import { CostDetailsQueryVariables } from "graphql/model/cost-details.graphql";
import _ from "lodash";

export default (_parent: unknown, args: CostDetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError("Authentication token is invalid, please log in.");

  const params = args.input;
  const fields: any = {};

  _.keys({ ...(params || {}) }).forEach((key) => {
    if (params[key]) fields[key] = params[key];
  });

  return getCostDetails(tanslateSnake({ userId: user.id, ...fields }));
};
