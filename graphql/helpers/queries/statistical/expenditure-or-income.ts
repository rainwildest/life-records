import { AuthenticationError } from "apollo-server-micro";
import { statisticalExpenditure } from "db/sql/statistical";
import { format } from "lib/apis/dayjs";

export default async (_parent: unknown, _args: { date: string; type: "pay" | "income" }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }
  const { date = format(new Date().toISOString(), "YYYY"), type } = _args;

  return statisticalExpenditure({
    userId: user.id,
    type,
    date,
    format: date.length > 4 ? "YYYY-MM" : "YYYY"
  });
};
