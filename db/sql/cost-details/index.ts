import CostDetails from "db/ormConfig/entities/cost_details";
import MikrotOrm, { knex } from "db/mikro-orm";

export const getCostDetails = async (
  userId: string
): Promise<CostDetailsOption> => {
  const orm = await MikrotOrm(CostDetails);
  return orm.where({ user_id: userId }).execute("all");
};
