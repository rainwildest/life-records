import { AuthenticationError } from "apollo-server-micro";
import { statisticalGeneralization } from "db/sql/statistical";

type FundPlanParam = {
  input: { type: string; date: string };
};

export default async (
  _parent: unknown,
  _args: FundPlanParam,
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }
  // "complete"
  return null;
};
