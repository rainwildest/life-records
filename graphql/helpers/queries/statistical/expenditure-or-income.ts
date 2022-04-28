import { AuthenticationError } from "apollo-server-micro";
import { statisticalExpenditure } from "db/sql/statistical";
import { getCurrentDate } from "lib/apis/dayjs";
import { autoFormatDate } from "lib/apis/utils";

export default async (_parent: unknown, _args: { date: string; type: "pay" | "income" }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;
  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }
  const { date = getCurrentDate("YYYY"), type } = _args;

  const $format = autoFormatDate(date);

  return statisticalExpenditure({
    userId: user.id,
    type,
    date,
    format: $format
  });
};
