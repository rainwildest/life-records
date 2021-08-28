import { Knex } from "knex";
import reset from "./data/reset";
import addUsers from "./data/users";
import addLivingExpenses from "./data/living-expenses";
import addCostDetails from "./data/cost-details";
import { CtxOptions } from "./utils/seed";

const ctx: CtxOptions = {};
export async function seed(knex: Knex): Promise<void> {
  await reset(knex);

  await addUsers(knex, ctx);
  console.log(`add users count:${ctx.users.docs?.length}`);

  await addLivingExpenses(knex, ctx);
  console.log(`add living-expenses count:${ctx.livingExpenses.docs?.length}`);

  await addCostDetails(knex, ctx);
  console.log(`add cost-details count:${ctx.costDetails.docs?.length}`);
}
