import { AuthenticationError } from "apollo-server-micro";
import { statisticalUserConsumption } from "db/sql/statistical";
import code from "lib/apis/code-comparison";

export default async (_parent: unknown, _args: { year: string }, context: unknown): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(JSON.stringify({ code: 3000, msg: code["3000"] }));
  }

  const fields = { userId: user.id };
  return {
    pay: {
      days: statisticalUserConsumption({ ...fields, format: "YYYY-MM-dd" }),
      months: statisticalUserConsumption({ ...fields, format: "YYYY-MM" }),
      years: statisticalUserConsumption({ ...fields, format: "YYYY" })
    },
    income: {
      days: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "YYYY-MM-DD"
      }),
      months: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "YYYY-MM"
      }),
      years: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "YYYY"
      })
    }
  };
};
