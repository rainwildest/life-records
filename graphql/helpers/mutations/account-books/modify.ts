import { UserInputError } from "apollo-server-micro";
import { modifyAccountBooks } from "db/sql/account-books";
import { tanslateSnake } from "lib/apis/utils";

export default (_: unknown, args: { id: string; name: string }, _context: unknown): Promise<any> => {
  if (!args.id) {
    throw new UserInputError("Account book information cannot be blank.");
  }

  return modifyAccountBooks(
    args.id,
    tanslateSnake({
      name: args.name,
      modifiedAt: new Date()
    })
  );
};
