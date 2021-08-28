import { Knex } from "knex";
import _ from "lodash";
import { UUID } from "../utils";
import { CtxOptions } from "../utils/seed";

const uuid = UUID();
export default async (knex: Knex, ctx: CtxOptions): Promise<void> => {
  const users = [{ id: uuid(), username: "rainwildest" }];

  await knex("users").insert([...users]);

  ctx.users = {
    docs: [...users],
    obj: _.keyBy(users, (o) => {
      return o.username;
    })
  };
};
