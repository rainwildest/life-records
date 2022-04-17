import { AuthenticationError } from "apollo-server-micro";
import { getUserById } from "db/sql/users";
export default (_parent: unknown, _args: unknown, context: unknown): any => {
  const { user } = context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  return getUserById(user.id);
};
