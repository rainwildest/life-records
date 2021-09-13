import CostDetails from "db/entities/cost_details";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";

/**
 * 新增用户消费记录
 * @param {Object} options
 * @returns Promise
 */
export const createCostDetail = async (
  options: CostDetailsSnakeOptions
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
  return create("cost_details", options);
};

export const modifyCostDetail = async (
  id: string,
  options: CostDetailsSnakeOptions
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
  return modify("cost_details", id, options);
};

export const removeCostDetail = async (
  id: string
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
  return remove("cost_details", id);
};

/**
 * 获取用户的消费记录
 * @param {string} userId 用户id
 * @returns Promise
 */
export const getCostDetails = async (
  userId: string
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
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
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
  const orm = await MikrotOrm(CostDetails);
  return orm
    .where({ user_id: userId })
    .andWhere("purchase_time >= ? and purchase_time < ?", [start, end])
    .andWhere("deleted_at is null")
    .orderBy({ ["purchase_time"]: "DESC" })
    .execute("all");
};

/**
 * 获取年月或全年数据
 * @param {string} userId 用户id
 * @param {string} date 年份或年月
 * @param {string} format 年份或年月的格式(yyyy || yyyy-mm)
 * @returns Promise
 */
export const getCostDetailsByYearsOrMonth = async (
  userId: string,
  date: string,
  format = "yyyy"
): Promise<CostDetailsSnakeOptions & IDSQLSnakeOptions> => {
  const orm = await MikrotOrm(CostDetails);
  return orm
    .where({ user_id: userId })
    .andWhere(`to_char(purchase_time, '${format}') = ?`, [date])
    .andWhere("deleted_at is null")
    .orderBy({ ["purchase_time"]: "DESC" })
    .execute("all");
};

/**
 *
 * @param {string} userId 用户id
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns Promise
 */
export const amountStatisticsByDate = async (
  userId: string,
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
    .whereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 获取年月或全年费用统计
 * @param {string} userId 用户id
 * @param {string} date 年份或年月
 * @param {string} format 年份或年月的格式(yyyy || yyyy-mm)
 * @returns Promise
 */
export const amountStatisticsByYearsOrMonth = async (
  userId: string,
  date: string,
  format: string
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
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};
