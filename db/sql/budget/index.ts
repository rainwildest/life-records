import MikrotOrm, { knex } from "db/mikro-orm";
import Budgets from "db/entities/budgets";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * @description 新增我的账簿
 * @param {Object} options
 * @returns Promise
 */
export const createBudget = async (options: BudgetProps): Promise<BudgetProps & DateAndIDFieldSnakeProps> => {
  return create("budgets", { ...options });
};

/**
 * @description 修改我的账簿
 * @param id
 * @param options
 * @returns Promise
 */
export const modifyBudget = async (id: string, options: BudgetProps): Promise<BudgetProps & DateAndIDFieldSnakeProps> => {
  return modify("budgets", id, { ...options });
};

/**
 * @description 删除我的账簿
 * @param id
 * @returns Promise
 */
export const removeBudget = async (id: string): Promise<BudgetProps & DateAndIDFieldSnakeProps> => {
  return remove("budgets", id);
};

/**
 *@description 获取某年某月的预算记录
 */
export const getBudgetsData = async (args: any = {}): Promise<BudgetProps & DateAndIDFieldSnakeProps> => {
  const { userId, date } = args;
  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(Budgets)
    .where({ user_id: userId })
    .andWhere(`to_char(created_at, 'YYYY-MM') = ?`, [date])
    .andWhere("deleted_at is null")
    .execute("all");
};

export const getBudgetsTotal = async (args: any = {}): Promise<any> => {
  const orm = await knex();

  return orm("budgets AS t1 ")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
          SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS amounts
      `)
    );
};
