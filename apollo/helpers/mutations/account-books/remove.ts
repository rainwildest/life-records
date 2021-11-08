import { UserInputError } from "apollo-server-micro";
import { removeAccountBooks } from "db/sql/account-books";

export default (
  _: unknown,
  args: { id: string },
  _context: unknown
): Promise<any> => {
  if (!args.id)
    throw new UserInputError("Account book information cannot be blank.");

  return removeAccountBooks(args.id);
};
