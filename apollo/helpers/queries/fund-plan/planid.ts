import { AuthenticationError } from "apollo-server-micro";
import { getPlannedDetailById } from "db/sql/fund-plan";

export default (_parent: unknown, _args: { id: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getPlannedDetailById(_args.id);
};
