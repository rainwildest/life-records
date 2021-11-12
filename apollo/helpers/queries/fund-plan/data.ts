import { AuthenticationError } from "apollo-server-micro";
import {
  getPlannedByUserId,
  getCompletedByUserId,
  getOverdueByUserId
} from "db/sql/fund-plan";
import { timeStamp } from "lib/api/utils";
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0);

  return `${year}-${month + 1}-${days}`;
};

export default (
  _parent: unknown,
  _args: { input: { type: string; date: string } },
  context: unknown
): any => {
  const { user } = context as GraphqlContext;
  const { type, date } = _args.input;
  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in."
    );
  }

  let _fun = null;

  switch (type) {
    case "overdue":
      _fun = getOverdueByUserId(user.id, getCurrentDate());
      break;
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
