import { Knex } from "knex";

export default async function (knex: Knex): Promise<void> {
  await knex("users").truncate();
  await knex("living_expenses").truncate();
  await knex("cost_details").truncate();
  await knex("account_books").truncate();
  await knex("fund_plan").truncate();
  // await knex("budgets").truncate();
}
