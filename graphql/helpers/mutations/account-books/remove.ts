import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { removeAccountBooks } from "db/sql/account-books";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { id: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError("Account book information cannot be blank.");

  return removeAccountBooks(args.id);
};
