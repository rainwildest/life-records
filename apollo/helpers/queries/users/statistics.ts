import { AuthenticationError } from "apollo-server-micro";
import { statisticalUserConsumption } from "db/sql/statistical";

export default async (
  _parent: unknown,
  _args: { year: string },
  context: unknown
): Promise<any> => {
  const { user } = context as GraphqlContext;

  if (!user?.id) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }

  const fields = { userId: user.id };
  return {
    pay: {
      days: statisticalUserConsumption({ ...fields, format: "yyyy-mm-dd" }),
      months: statisticalUserConsumption({ ...fields, format: "yyyy-mm" }),
      years: statisticalUserConsumption({ ...fields, format: "yyyy" })
    },
    income: {
      days: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "yyyy-mm-dd"
      }),
      months: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "yyyy-mm"
      }),
      years: statisticalUserConsumption({
        ...fields,
        type: "income",
        format: "yyyy"
      })
    }
  };
};
