import { AuthenticationError } from "apollo-server-micro";
import { getPlannedByUserId, getCompletedByUserId } from "db/sql/fund-plan";
import { timeStamp } from "lib/api/utils";

const getCurrentDate = (type?: "year" | "date") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  return type === "year" ? `${year}` : `${year}-${month + 1}-${days}`;
};

export default (
  _parent: unknown,
  _args: { input: { type: string; date: string } },
  context: unknown
): any => {
  const { user } = context as GraphqlContext;
  const { type, date = getCurrentDate("year") } = _args.input;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  let _fun = null;
  switch (type) {
    case "complete":
      _fun = getCompletedByUserId(user.id, date);
      break;
    default:
      _fun = getPlannedByUserId(user.id);
      break;
  }

  return {
    data: _fun,
    time: timeStamp()
  };
};
