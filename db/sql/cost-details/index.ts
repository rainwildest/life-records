import CostDetails from "db/entities/cost-details";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";

/**
 * 新增用户消费记录
 * @method createCostDetail
 * @param {Object} options 新增记录参数
 * @returns Promise
 */
export const createCostDetail = async (
  options: CostDetailsSnakeOptions
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return create("cost_details", options);
};

/**
 * 修改用户消费记录
 * @method modifyCostDetail
 * @param {Object} options 修改记录参数
 * @returns Promise
 */
export const modifyCostDetail = async (
  id: string,
  options: CostDetailsSnakeOptions
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return modify("cost_details", id, options);
};

/**
 * 删除用户消费记录
 * @method removeCostDetail
 * @param id
 * @returns Promise
 */
export const removeCostDetail = async (
  id: string
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("cost_details", id);
};

/**
 * 获取用户的消费记录
 * @method getCostDetails
 * @param {string} userId 用户id
 * @returns Promise
 */
export const getCostDetails = async (
  args: any
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(CostDetails);
  return orm.where(args).andWhere("deleted_at is null").execute("all");
};

/**
 * 通过日期获取用户的消费记录
 * @method getCostDetailsByDate
 * @param {string} userId 用户id
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns Promise
 */
export const getCostDetailsByDate = async (
  userId: string,
  start: string,
  end: string
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
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
 * @method getCostDetailsByYearsOrMonth
 * @param {string} userId 用户id
 * @param {string} date 年份或年月
 * @param {string} format 年份或年月的格式(yyyy || yyyy-mm)
 * @returns Promise
 */
export const getCostDetailsByYearsOrMonth = async (
  userId: string,
  date: string,
  format = "yyyy"
): Promise<CostDetailsSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(CostDetails);
  return orm
    .where({ user_id: userId })
    .andWhere(`to_char(purchase_time, '${format}') = ?`, [date])
    .andWhere("deleted_at is null")
    .orderBy({ ["purchase_time"]: "DESC" })
    .execute("all");
};

export const getCostDetailsByBookId = () => {
  return null;
};
