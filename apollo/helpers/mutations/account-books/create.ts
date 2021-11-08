import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createAccountBooks } from "db/sql/account-books";
import { tanslateSnake } from "lib/api/utils";

export default (
  _: unknown,
  args: { name: string },
  _context: unknown
): Promise<any> => {
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  if (!args.name) {
    throw new UserInputError("Account book name cannot be blank.");
  }

  return createAccountBooks(
    tanslateSnake({
      name: args.name,
      userId: user.id
    })
  );
};
