import { UserInputError } from "apollo-server-micro";
import { getCostDetails } from "db/sql/cost-details";
import { tanslateSnake } from "lib/api/utils";

export default (_: unknown, _args: { userId: string }): Promise<any> => {
  const { userId } = _args;
  if (!userId) throw new UserInputError("User information cannot be empty.");

  return getCostDetails(tanslateSnake({ userId }));
};
