import { AuthenticationError } from "apollo-server-micro";
import { getAccountBooksByUserId } from "db/sql/account-books";

export default (_parent: unknown, _args: { type: string; date: string }, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getAccountBooksByUserId(user.id);
};
