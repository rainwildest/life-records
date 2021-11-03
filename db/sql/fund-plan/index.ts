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
 * @returns
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
