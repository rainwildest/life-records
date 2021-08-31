import LivingExpenses from "db/entities/living_expenses";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * 新增消费类型
 * @param {Object} options
 * @returns Promise
 */
export const createLivingExpenses = async (
  options: LivingExpensesOption
): Promise<LivingExpensesOption & IDSQLOption> => {
  return create("living_expenses", { ...options });
};

/**
 * 修改消费类型
 * @param id
 * @param options
 * @returns
 */
export const modifyLivingExpense = async (
  id: string,
  options: LivingExpensesOption
): Promise<LivingExpensesOption & IDSQLOption> => {
  return modify("living_expenses", id, { ...options });
};

export const removeLivingExpense = async (
  id: string
): Promise<LivingExpensesOption & IDSQLOption> => {
  return remove("living_expenses", id);
};

/**
 *
 * @param id 餐饮类型id
 * @returns Promise
 */
export const getLivingExpense = async (
  id: string
): Promise<LivingExpensesOption & IDSQLOption> => {
  return getDatabyId(LivingExpenses, id);
};

/**
 * 获取用户的消费类型
 * @param id 用户id
 */
export const getUserLivingExpense = async (
  id: string
): Promise<LivingExpensesOption & IDSQLOption> => {
  const orm = await MikrotOrm(LivingExpenses);

  return orm
    .where({ user_id: id })
    .orWhere("user_id is null")
    .andWhere("deleted_at is null")
    .execute("all");
};
