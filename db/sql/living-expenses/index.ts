import LivingExpenses from "db/entities/living-expenses";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * 新增消费类型
 * @param {Object} options
 * @returns Promise
 */
export const createLivingExpenses = async (
  options: LivingExpensesSnakeOptions
): Promise<LivingExpensesSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
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
  options: LivingExpensesSnakeOptions
): Promise<LivingExpensesSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return modify("living_expenses", id, { ...options });
};

export const removeLivingExpense = async (id: string): Promise<LivingExpensesSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("living_expenses", id);
};

/**
 *
 * @param id 餐饮类型id
 * @returns Promise
 */
export const getLivingExpense = async (id: string): Promise<LivingExpensesSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return getDatabyId(LivingExpenses, id);
};

/**
 * 获取用户的消费类型
 * @param id 用户id
 */
export const getUserLivingExpense = async (
  id: string,
  type: string
): Promise<LivingExpensesSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(LivingExpenses)
    .where("user_id=? or user_id is null", [id])
    .andWhere({ expense_type: type })
    .andWhere("deleted_at is null")
    .execute("all");
};
