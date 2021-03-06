import { AuthenticationError } from "apollo-server-micro";
import { getPlannedByUserId, getCompleted } from "db/sql/fund-plan";
import { timeStamp } from "lib/apis/utils";
import code from "lib/apis/code-comparison";

const getCurrentDate = (type?: "year" | "date") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  return type === "year" ? `${year}` : `${year}-${month + 1}-${days}`;
};

export default (_parent: unknown, _args: { input: { type: string; year: string; expenseId: string } }, context: unknown): any => {
  const { user } = context as GraphqlContext;
  const { type, year = getCurrentDate("year"), expenseId } = _args.input;

  if (!user?.id) throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));

  let _fun = null;
  switch (type) {
    case "complete":
      _fun = getCompleted({ userId: user.id, year, expenseId });
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
