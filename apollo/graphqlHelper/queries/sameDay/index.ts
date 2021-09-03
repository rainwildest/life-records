import { AuthenticationError } from "apollo-server-micro";
import { amountStatisticsByDate } from "db/sql/cost-details";

export default (_parent, _args: { type: string }, context): any => {
  const { user } = context;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  const start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);

  return amountStatisticsByDate(start.toISOString(), end.toISOString());
};
