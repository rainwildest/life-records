import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID("10000000");
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  // 费用类型（收入：income；支出：pay）
  const types = [
    { name: "餐饮", type: "pay" },
    { name: "服饰", type: "pay" },
    { name: "零食", type: "pay" },
    { name: "书籍", type: "pay" },
    { name: "长辈", type: "pay" },
    { name: "交通", type: "pay" },
    { name: "果蔬", type: "pay" },
    { name: "医疗", type: "pay" },
    { name: "理财", type: "income" },
    { name: "副业", type: "income" },
    { name: "工资", type: "income" }
  ];

  const expenses = [];

  types.forEach((item) => {
    expenses.push({
      id: uuid(),
      // user_id: user.id,
      expense_type: item.type,
      expense_name: item.name
    });
  });

  await knex("living_expenses").insert([...expenses]);

  ctx.livingExpenses = {
    docs: [...expenses],
    obj: _.keyBy(expenses, (o) => {
      return o.id;
    })
  };
};
