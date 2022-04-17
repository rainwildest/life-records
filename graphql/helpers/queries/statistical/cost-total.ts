import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalCostTotal } from "db/sql/statistical";
import { DetailsQueryVariables } from "../../../graphql/model/statistics.graphql";

export default (_parent: unknown, args: DetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const params = args.input;

  /* 按日期搜索 */
  const date = params?.date || "";

  const $args = {
    userId: "",
    format: date.length > 4 ? "YYYY-MM" : "YYYY",
    groupFormat: "MM-DD",
    date: "",
    type: "pay"
  };
  if (date.length) {
    // return getStatisticalCostTotal(user.id, params.type, date, date.length > 4 ? "yyyy-mm" : "yyyy");
    return null;
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

  return null;
  // return getCostDetailsByDate(user.id, params.type, start.toISOString(), end.toISOString());
};
