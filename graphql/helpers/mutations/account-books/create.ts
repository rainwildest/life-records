import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { createAccountBooks } from "db/sql/account-books";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { name: string }, _context: unknown): Promise<any> => {
  const { user } = _context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
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
