import { AuthenticationError } from "apollo-server-micro";
import { getStatisticalCostTotalByDate } from "db/sql/statistical";
import { GetCostTotalDetailsQueryVariables } from "graphql/model/statistics.graphql";
import { autoFormatDate } from "lib/apis/utils";

export default (_parent: unknown, args: GetCostTotalDetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const params = args.input;
  const date: string = params?.date || "";

  let format = "";
  if (date.length && !params.format) format = autoFormatDate(date);

  const $args = {
    userId: user.id,
    date,
    format,
    type: params?.type || "pay",
    groupFormat: params?.groupFormat || "MM-DD",
    expenseId: params.expenseId
  };

  if (date.length) return getStatisticalCostTotalByDate($args);

  return null;
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
