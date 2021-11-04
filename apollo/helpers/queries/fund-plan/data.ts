import { AuthenticationError } from "apollo-server-micro";
import { getPlannedByUserId } from "db/sql/fund-plan";

export default (
  _parent: unknown,
  _args: { type: string },
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  return getPlannedByUserId(user.id);
};
