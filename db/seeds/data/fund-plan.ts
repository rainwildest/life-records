import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID("40000000");
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  const details = [];

  const expenses = _.keys(ctx.livingExpenses.obj);
  const user = ctx.users.docs.find((user) => user.username === "rainwildest");

  for (let i = 0; i < 5; ++i) {
    const random = parseInt((Math.random() * 4).toString());
    const expenseId = expenses.splice(random, 1);
    const amounts = parseInt((Math.random() * 500).toString());

    const randomMonth = parseInt((Math.random() * 12).toString());

    const date = new Date();
    date.setMonth(randomMonth);
    const days = new Date(date.getFullYear(), randomMonth + 1, 0).getDate();
    date.setDate(days);

    details.push({
      id: uuid(),
      user_id: user.id,
      amounts,
      name: `Macbook pro 14-${i + 1}`,
      expense_id: expenseId[0],
      approximate_at: new Date(date)
    });
  }

  await knex("fund_plan").insert([...details]);

  ctx.fundPlan = {
    docs: [...details],
    obj: _.keyBy(details, (o) => o.id)
  };
};
