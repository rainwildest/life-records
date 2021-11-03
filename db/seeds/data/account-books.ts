import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID("30000000");
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  const details = [];

  const user = ctx.users.docs.find((user) => user.username === "rainwildest");
  const books = ["六脉神剑", "如来神掌", "路过的假面骑士"];
  for (let i = 0; i < books.length; ++i) {
    details.push({
      id: uuid(),
      user_id: user.id,
      name: books[i]
    });
  }

  await knex("account_books").insert([...details]);

  ctx.accountBooks = {
    docs: [...details],
    obj: _.keyBy(details, (o) => o.id)
  };
};
