import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID();
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  const users = [
    {
      id: uuid(),
      username: "rainwildest",
      email: "rainwildest@163.com",
      password: "25d55ad283aa400af464c76d713c07ad"
    }
  ];

  await knex("users").insert([...users]);

  ctx.users = {
    docs: [...users],
    obj: _.keyBy(users, (o) => o.username)
  };
};
