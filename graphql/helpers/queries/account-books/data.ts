import { AuthenticationError } from "apollo-server-micro";
import { getAccountBooksByUserId } from "db/sql/account-books";
import { QueryAccountBooksArgs } from "@graphql-types@";
import code from "lib/apis/code-comparison";

export default (parent: unknown, args: QueryAccountBooksArgs, context: unknown): any => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  return getAccountBooksByUserId({ userId: user.id, ...(args.input || {}) });
};
