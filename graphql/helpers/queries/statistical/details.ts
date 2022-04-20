import { AuthenticationError } from "apollo-server-micro";
import { getCostDetailsByTimeSlot, getCostDetailsByDate, getCostDetailsByDateAndExpenseId } from "db/sql/cost-details";
import { GetCostTotalDetailsQueryVariables } from "graphql/model/statistics.graphql";
import { autoFormatDate } from "lib/apis/utils";
import { getSameDayTimeSlot } from "./utils";

export default (_parent: unknown, args: GetCostTotalDetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const params = args.input;
  const date: string = params?.date || "";

  console.log(args);
  let format = "";
  if (date.length && !params.format) format = autoFormatDate(date);
  /* 按日期搜索 */

  let $args: any = { userId: user?.id, type: params.type, date, format, expenseId: params.expenseId };

  if (date.length) {
    // getCostDetailsByDateAndExpenseId
    const details = params.expenseId ? getCostDetailsByDateAndExpenseId : getCostDetailsByDate;
    return details($args);
  }

  /* 获取当日数据 */
  const { start, end } = getSameDayTimeSlot();

  $args = { userId: user?.id, type: params.type, start, end };
  return getCostDetailsByTimeSlot($args);
};