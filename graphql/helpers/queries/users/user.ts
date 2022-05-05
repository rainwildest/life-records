import { AuthenticationError } from "apollo-server-micro";
import { getUserById } from "db/sql/users";
import code from "lib/apis/code-comparison";

export default (_parent: unknown, _args: unknown, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  return getUserById(user.id);
};
