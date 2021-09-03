import CostDetails from "db/entities/cost_details";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";
import { v4 as uuid } from "uuid";

/**
 * 新增用户消费记录
 * @param {Object} options
 * @returns Promise
 */
export const createCostDetail = async (
  options: CostDetailsOption
): Promise<CostDetailsOption & IDSQLOption> => {
  return create("cost_details", options);
};

export const modifyCostDetail = async (
  id: string,
  options: CostDetailsOption
): Promise<CostDetailsOption & IDSQLOption> => {
  return modify("cost_details", id, options);
};

export const removeCostDetail = async (
  id: string
): Promise<CostDetailsOption & IDSQLOption> => {
  return remove("cost_details", id);
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

/**
 * 获取用户的消费记录
 * @param {string} userId 用户id
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns Promise
 */
export const getCostDetailsByDate = async (
  userId: string,
  start: string,
  end: string
): Promise<CostDetailsOption & IDSQLOption> => {
  const orm = await MikrotOrm(CostDetails);
  return orm
    .where({ user_id: userId })
    .andWhere("purchase_time >= ? and purchase_time < ?", [start, end])
    .andWhere("deleted_at is null")
    .orderBy({ ["purchase_time"]: "DESC" })
    .execute("all");
};

export const amountStatisticsByDate = async (
  start: string,
  end: string
): Promise<any> => {
  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
      SUM(CASE WHEN t2.expense_type='pay' THEN t1.expense_price ELSE 0 END) AS pay,
      SUM(CASE WHEN t2.expense_type='income' THEN t1.expense_price ELSE 0 END) AS income
    `)
    )
    .whereRaw(`t1.purchase_time >= '${start}' AND t1.purchase_time < '${end}'`)
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};
