import MikrotOrm, { knex } from "db/mikro-orm";

/**
 * @method amountStatisticsByDate
 * @param {string} userId 用户id
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns Promise
 */
export const amountStatisticsByDate = async (userId: string, start: string, end: string): Promise<any> => {
  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income
      `)
    )
    .whereRaw(`t1.purchase_time >= '${start}' AND t1.purchase_time < '${end}'`)
    .whereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 获取年月或全年费用统计
 * @method amountStatisticsByYearsOrMonth
 * @param {string} userId 用户id
 * @param {string} date 年份或年月
 * @param {string} format 年份或年月的格式(yyyy || yyyy-mm)
 * @returns Promise
 */
export const amountStatisticsByYearsOrMonth = async (userId: string, date: string, format: string): Promise<any> => {
  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 统计全年月份收入和支出概括
 * @method statisticalGeneralization
 * @param {string} userId 用户 id
 * @param {string} year 年份（例：2021）
 * @returns Promise
 */
export const statisticalGeneralization = async (userId: string, year: string): Promise<any> => {
  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income,
        to_char(t1.purchase_time, 'yyyy-mm') as purchase_time
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, 'yyyy') = ?`, [year])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .groupByRaw(`to_char(t1.purchase_time, 'yyyy-mm')`)
    .orderBy("purchase_time", "ASC");
};

/**
 * 统计全年或月份的支出、收入情况
 * @method statisticalExpenditure
 * @param {string} userId 用户 id
 * @param {string} date 日期
 * @param {string} type 统计类型
 * @param {string} format 日期格式
 * @returns Promise
 */
export const statisticalExpenditure = async (args: {
  userId: string;
  date?: string;
  type?: "pay" | "income";
  format?: string;
}): Promise<any> => {
  const { userId, date, type = "pay", format = "yyyy" } = args;

  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='${type}' THEN t1.amounts ELSE 0 END) AS ${type}, 
        t2.expense_name,
        t2.expense_icon,
        to_char(purchase_time, '${format}') as purchase_time 
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .andWhereRaw(`t2.expense_type = ?`, [type])
    .whereNull("t1.deleted_at")
    .groupByRaw(`t2.expense_name, t2.expense_icon, to_char(t1.purchase_time, '${format}')`)
    .orderBy("purchase_time", "ASC");
};

/**
 * 统计全年、当天、当月费用
 * @method statisticalUserConsumption
 * @param {string} userId 用户 id
 * @param {string} type 统计类型
 * @param {string} format 日期格式
 * @returns Promise
 */
export const statisticalUserConsumption = async (args: {
  userId: string;
  type?: "pay" | "income";
  format?: string;
}): Promise<any> => {
  const { userId, type = "pay", format = "yyyy" } = args;

  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='${type}' THEN t1.amounts ELSE 0 END) AS ${type},
        to_char(purchase_time, '${format}') as purchase_time
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, '${format}') = to_char(now(), '${format}')`)
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .andWhereRaw(`t2.expense_type = ?`, [type])
    .whereNull("t1.deleted_at")
    .groupByRaw(`to_char(t1.purchase_time, '${format}')`)
    .then((rows) => (rows.length ? rows[0][type] || 0 : 0));
};

/**
 * @method statisticalCostByBooks
 * @param {string} userId 用户ID
 * @param {string} bookId 账簿ID
 * @returns Promise
 */
export const statisticalCostByBooks = async (userId: string, bookId: string): Promise<any> => {
  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income
    `)
    )
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .andWhereRaw(`t1.book_id = ?`, [bookId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 统计已完成或计划中的资金计划
 * @method statisticalFundPlan
 * @param {string} year 年份（如果不传则统计计划中的内容）
 * @param {string} expenseId 消费类型 id
 * @returns Promise
 */
export const statisticalFundPlan = async (args: { userId: string; year?: string; expenseId?: string }): Promise<any> => {
  const { userId, year } = args;
  if (!year) return statisticalFundPlanPlanned(userId);

  return statisticalFundPlanCompleted(args);
};

/**
 * 统计已完成或计划中的资金计划
 * @method statisticalFundPlan
 * @param {string} year 年份（如果不传则统计计划中的内容）
 * @param {string} expenseId 消费类型 id
 * @returns Promise
 */
export const statisticalFundPlanPlanned = async (userId: string): Promise<any> => {
  const orm = await knex();

  return orm("fund_plan")
    .select(orm.raw(`SUM(amounts) AS total`))
    .where({ user_id: userId })
    .whereNull("deleted_at")
    .whereNull("complete_at")
    .then((rows) => (rows.length ? rows[0] : { total: 0 }));
};

export const statisticalFundPlanCompleted = async (args: { userId: String; year?: string; expenseId?: string }): Promise<any> => {
  const { userId, year, expenseId } = args;
  const orm = await knex();

  const condition = [`t1.user_id = '${userId}'`, `to_char(approximate_at, 'yyyy') = '${year}'`];

  if (expenseId) condition.push(`t2.id = '${expenseId}'`);

  return orm("fund_plan AS t1")
    .joinRaw("JOIN living_expenses AS t2 ON t1.expense_id=t2.id::text")
    .select(orm.raw(`SUM(amounts) AS total`))
    .whereRaw(condition.join(" AND "))
    .whereNotNull("t1.complete_at")
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : { total: 0 }));
};
