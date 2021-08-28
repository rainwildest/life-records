import CostDetails from "db/entities/cost_details";
import MikrotOrm, { knex } from "db/mikro-orm";
import { v4 as uuid } from "uuid";
/**
 * 新增用户消费记录
 * @param {Object} options
 * @returns Promise
 */
export const createCostDetail = async (
  options: CostDetailsOption
): Promise<CostDetailsOption & IDSQLOption> => {
  // if (process.env.SQLType === "sqlite") {
  //   const orm = await knex();
  //   const primaryKey = await orm("cost_details")
  //     .insert({ ...options, id: uuid() })
  //     .then((rows) => (rows.length ? rows[0] : null));

  //   return orm("cost_details")
  //     .where({ seq_id: primaryKey })
  //     .then((rows) => (rows.length ? rows[0] : null));
  // }

  /* 默认使用pgsql */
  const orm = await knex();
  return orm("cost_details")
    .insert({ ...options })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

export const modifyCostDetail = async (
  id: string,
  options: CostDetailsOption
): Promise<CostDetailsOption & IDSQLOption> => {
  const orm = await knex();

  // if (process.env.SQLType === "sqlite") {
  //   const updateState = await orm("cost_details")
  //     .where({ id })
  //     .update({ ...options })
  //     .then((rows) => (rows ? rows : null));

  //   if (updateState) {
  //     return orm("cost_details")
  //       .where({ id })
  //       .then((rows) => (rows.length ? rows[0] : null));
  //   } else {
  //     return null;
  //   }
  // }

  return orm("cost_details")
    .where({ id })
    .update({ ...options })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

export const removeCostDetail = async (
  id: string
): Promise<CostDetailsOption & IDSQLOption> => {
  const orm = await knex();

  return orm("cost_details")
    .where({ id })
    .update({ deleted_at: new Date() })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 获取用户的消费记录
 * @param {string} userId 用户id
 * @returns Promise
 */
export const getCostDetails = async (
  userId: string
): Promise<CostDetailsOption & IDSQLOption> => {
  const orm = await MikrotOrm(CostDetails);
  return orm
    .where({ user_id: userId })
    .andWhere("deleted_at is null")
    .execute("all");
};
