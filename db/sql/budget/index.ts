import MikrotOrm, { knex } from "db/mikro-orm";
import Budgets from "db/entities/budgets";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * @description 新增我的账簿
 * @param {Object} options
 * @returns Promise
 */
export const createBudget = async (options: BudgetSnakeProps): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  return create("budgets", { ...options });
};

/**
 * @description 修改我的账簿
 * @param id
 * @param options
 * @returns Promise
 */
export const modifyBudget = async (
  id: string,
  options: BudgetSnakeProps
): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  return modify("budgets", id, { ...options });
};

/**
 * @description 删除我的账簿
 * @param id
 * @returns Promise
 */
export const removeBudget = async (id: string): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  return remove("budgets", id);
};

export const getBudgetById = async (id: string): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  return getDatabyId(Budgets, id);
};

/**
 * @description 获取当月存在的预算信息
 * @param args
 * @returns Promise
 */
export const getBudgetByDateAndExpense = async (args: any = {}): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, date, expenseId } = args;
  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(Budgets)
    .where({ user_id: userId })
    .andWhere(`to_char(created_at, 'YYYY-MM') = ?`, [date])
    .andWhere({ expense_id: expenseId })
    .andWhere("deleted_at is null")
    .execute("get");
};

/**
 * @description 获取当月存在的预算信息 (除开当前信息)
 * @param args
 * @returns Promise
 */
export const getBudgetByExceptId = async (args: any = {}): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
  const { id, userId, date, expenseId } = args;

  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(Budgets)
    .where({ user_id: userId })
    .andWhere(`id != ?`, [id])
    .andWhere(`to_char(created_at, 'YYYY-MM') = ?`, [date])
    .andWhere({ expense_id: expenseId })
    .andWhere("deleted_at is null")
    .execute("get");
};

/**
 *@description 获取某年某月的预算记录
 */
export const getBudgetsData = async (args: any = {}): Promise<BudgetSnakeProps & DateAndIDFieldSnakeProps> => {
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
  const { userId, format = "YYYY-MM", date } = args;

  return orm("budgets AS t1 ")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
          SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS amounts
      `)
    )
    .where({ "t1.user_id": userId })
    .whereRaw(`to_char(t1.created_at, '${format}') = ?`, [date])
    .whereNull("t1.deleted_at")
    .then((rows: any[]) => {
      const useArray = (format as string).includes("-");

      return rows?.length ? rows[0]?.amounts || 0 : 0;
      // if (rows?.length) return useArray ? rows : rows[0].amounts || 0;

      // return null;
    });
};
