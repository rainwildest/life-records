import FundPlan from "db/entities/fund-plan";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";

/**
 * 新增资金计划
 * @param {Object} options
 * @returns Promise
 */
export const createFundPlan = async (
  options: FundPlanSnakeOptions
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return create("fund_plan", { ...options });
};

/**
 * 修改资金计划
 * @param id
 * @param options
 * @returns Promise
 */
export const modifyFundPlan = async (
  id: string,
  options: FundPlanSnakeOptions
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return modify("fund_plan", id, { ...options });
};

/**
 * 删除资金计划
 * @param id
 * @returns Promise
 */
export const removeFundPlan = async (
  id: string
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("fund_plan", id);
};

/**
 * 计划中
 */
export const getPlannedByUserId = async (
  userId: string
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(FundPlan);

  return orm
    .where({ user_id: userId })
    .andWhere("deleted_at is null")
    .andWhere("complete_at is null")
    .orderBy({ ["created_at"]: "DESC" })
    .execute("all");
};

/**
 * 已完成
 */
export const getCompletedByUserId = async (
  userId: string,
  date: string
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(FundPlan);

  return orm
    .where({ user_id: userId })
    .andWhere(`to_char(approximate_at, 'yyyy') = ?`, [date])
    .andWhere("complete_at is not null")
    .andWhere("deleted_at is null")
    .execute("all");
};

/**
 * 已逾期
 */
export const getOverdueByUserId = async (
  userId: string,
  date: string
): Promise<FundPlanSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(FundPlan);

  return orm
    .where({ user_id: userId })
    .andWhere(`to_char(approximate_at, 'yyyy-mm-dd') < ?`, [date])
    .andWhere("complete_at is null")
    .andWhere("deleted_at is null")
    .execute("all");
};
