import { AuthenticationError } from "apollo-server-micro";
import { getAmountStatisticsByTimeSlot, getAmountStatisticsByDate } from "db/sql/statistical";
import { DetailsQueryVariables } from "../../../graphql/model/statistics.graphql";
import { autoFormatDate } from "lib/apis/utils";

export default async (_parent: unknown, args: DetailsQueryVariables, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError("Authentication token is invalid, please log in.");
  }

  const params = args.input;
  const date: string = params?.date || "";

  let format = "";
  if (date.length && !params.format) format = autoFormatDate(date);

  let $args: any = { userId: user?.id, type: params.type, date, format };
  if (date.length) return getAmountStatisticsByDate($args);

  const start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const end = new Date();
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);

  $args = {
    userId: user?.id,
    type: params.type,
    start: start.toISOString(),
    end: end.toISOString()
  };
  return getAmountStatisticsByTimeSlot($args);
};
