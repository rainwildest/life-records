import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID("50000000");
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
      amounts,
      expense_id: expenseId[0]
    });
  }

  await knex("budgets").insert([...details]);

  ctx.budgets = {
    docs: [...details],
    obj: _.keyBy(details, (o) => o.id)
  };
};
