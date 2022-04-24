import FundPlan from "db/entities/fund-plan";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * 新增资金计划
 * @param {Object} options
 * @returns Promise
 */
export const createFundPlan = async (options: FundPlanSnakeProps): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
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
  options: FundPlanSnakeProps
): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  return modify("fund_plan", id, { ...options });
};

/**
 * 删除资金计划
 * @param id
 * @returns Promise
 */
export const removeFundPlan = async (id: string): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  return remove("fund_plan", id);
};

/**
 * 计划中
 */
export const getPlannedByUserId = async (userId: string): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(FundPlan)
    .where({ user_id: userId })
    .andWhere("deleted_at is null")
    .andWhere("complete_at is null")
    .orderBy({ ["created_at"]: "DESC" })
    .execute("all");
};

type CompletedParam = {
  year: string;
  userId: string;
  expenseId?: string;
};

/**
 * 已完成（通过日期）
 * @method getCompletedByDate
 * @param {object} args
 * @returns Promise
 */
export const getCompletedByDate = async (args: CompletedParam): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, year } = args;
  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(FundPlan)
    .where({ user_id: userId })
    .andWhere(`to_char(approximate_at, 'YYYY') = ?`, [year])
    .andWhere("complete_at is not null")
    .andWhere("deleted_at is null")
    .execute("all");
};

/**
 * 已完成（通过日期和消费类型 ID）
 * @method getCompletedByExpenses
 * @param {object} args
 * @returns Promise
 */
export const getCompletedByExpenses = async (args: CompletedParam): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, expenseId, year } = args;
  const orm = await knex();

  const condition = [`t1.user_id = '${userId}'`, `to_char(approximate_at, 'YYYY') = '${year}'`];

  if (expenseId) condition.push(`t2.id = '${expenseId}'`);

  return orm("fund_plan AS t1")
    .joinRaw("JOIN living_expenses AS t2 ON t1.expense_id=t2.id::text")
    .select(orm.raw("t1.*"))
    .whereRaw(condition.join(" AND "))
    .whereNotNull("t1.complete_at")
    .whereNull("t1.deleted_at");
};

/**
 * 已完成
 * @method getCompletedByDate
 * @param {object} args
 * @returns Promise
 */
export const getCompleted = (args: CompletedParam): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  const _fun = args.expenseId ? getCompletedByExpenses : getCompletedByDate;
  return _fun(args);
};

export const getPlannedDetailById = async (id: string): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
  return getDatabyId(FundPlan, id);
};

// /**
//  * 已逾期
//  */
// export const getOverdueByUserId = async (
//   userId: string,
//   date: string
// ): Promise<FundPlanSnakeProps & DateAndIDFieldSnakeProps> => {
//   const orm = await MikrotOrm(FundPlan);

//   return orm
//     .where({ user_id: userId })
//     .andWhere(`to_char(approximate_at, 'YYYY-MM-DD') < ?`, [date])
//     .andWhere("complete_at is null")
//     .andWhere("deleted_at is null")
//     .execute("all");
// };
