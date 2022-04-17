import { AuthenticationError } from "apollo-server-micro";
import { getCostDetailsByDate, getCostDetailsByYearsOrMonth } from "db/sql/cost-details";
import { DetailsQueryVariables } from "../../../graphql/model/statistics.graphql";

export default (_parent: unknown, args: DetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const params = args.input;

  /* 按日期搜索 */
  const date = params?.date || "";
  if (date.length) {
    return getCostDetailsByYearsOrMonth(user.id, params.type, date, date.length > 4 ? "yyyy-mm" : "yyyy");
  }

  /* 获取当日数据 */
  const start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);

  return getCostDetailsByDate(user.id, params.type, start.toISOString(), end.toISOString());
};
