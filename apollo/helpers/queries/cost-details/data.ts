import { UserInputError } from "apollo-server-micro";
import { getCostDetails } from "db/sql/cost-details";

export default (_: unknown, _args: { userId: string }): Promise<any> => {
  const { userId } = _args;
  if (!userId) throw new UserInputError("User information cannot be empty.");

  return getCostDetails(userId);
};
