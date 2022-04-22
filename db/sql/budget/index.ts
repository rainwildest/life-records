import MikrotOrm, { knex } from "db/mikro-orm";
import Budgets from "db/entities/budgets";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * @description 新增我的账簿
 * @param {Object} options
 * @returns Promise
 */
export const createBudget = async (options: BudgetOptions): Promise<BudgetOptions & DateAndIdSQLFieldSnakeOption> => {
  return create("budgets", { ...options });
};

/**
 * @description 修改我的账簿
 * @param id
 * @param options
 * @returns Promise
 */
export const modifyBudget = async (id: string, options: BudgetOptions): Promise<BudgetOptions & DateAndIdSQLFieldSnakeOption> => {
  return modify("budgets", id, { ...options });
};

/**
 * @description 删除我的账簿
 * @param id
 * @returns Promise
 */
export const removeBudget = async (id: string): Promise<BudgetOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("budgets", id);
};
