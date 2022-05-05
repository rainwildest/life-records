import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { modifyAccountBooks } from "db/sql/account-books";
import { tanslateSnake } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

export default (_: unknown, args: { id: string; name: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  if (!args.id) throw new UserInputError(JSON.stringify({ code: 4000, msg: "Account book information cannot be blank." }));

  return modifyAccountBooks(
    args.id,
    tanslateSnake({
      name: args.name,
      modifiedAt: new Date()
    })
  );
};
