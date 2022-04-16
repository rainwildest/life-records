import { AuthenticationError } from "apollo-server-micro";
import { amountStatisticsByDate, amountStatisticsByYearsOrMonth } from "db/sql/statistical";

export default (_parent: unknown, _args: { date: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const date = _args?.date || "";
  if (date.length) {
    return amountStatisticsByYearsOrMonth(user?.id, date, date.length > 4 ? "yyyy-mm" : "yyyy");
  }

  const start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);

  return amountStatisticsByDate(user.id, start.toISOString(), end.toISOString());
};
