import { AuthenticationError } from "apollo-server-micro";
import { getAccountBooksByUserId } from "db/sql/account-books";
import { QueryAccountBooksArgs } from "@graphql-types@";

export default (parent: unknown, args: QueryAccountBooksArgs, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  return getAccountBooksByUserId({ userId: user.id, ...(args.input || {}) });
};
