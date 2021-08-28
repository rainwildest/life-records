import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID("20000000");
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  const details = [];

  const expenses = _.keys(ctx.livingExpenses.obj);
  const user = ctx.users.docs.find((user) => user.username === "rainwildest");

  for (let i = 0; i < 5; ++i) {
    const random = parseInt((Math.random() * 4).toString());
    const expenseId = expenses.splice(random, 1);
    const amounts = parseInt((Math.random() * 500).toString());
    details.push({
      id: uuid(),
      user_id: user.id,
      expense_id: expenseId[0],
      expense_price: amounts,
      purchase_time: new Date()
    });
  }

  await knex("cost_details").insert([...details]);

  ctx.costDetails = {
    docs: [...details],
    obj: _.keyBy(details, (o) => {
      return o.id;
    })
  };
};
