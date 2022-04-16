import { AuthenticationError } from "apollo-server-micro";
import { statisticalGeneralization } from "db/sql/statistical";
import { format } from "lib/api/dayjs";

export default async (_parent: unknown, _args: { year: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  const { year = format(new Date().toISOString(), "YYYY") } = _args;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  // const year = format(new Date().toISOString(), "YYYY");
  return statisticalGeneralization(user.id, year);
};
