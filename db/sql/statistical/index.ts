import MikrotOrm, { knex } from "db/mikro-orm";

/**
 * @description 根据时间段获取费用统计
 * @param {object} args
 *  @value string userId 用户id
 *  @value string type 费用类型
 *  @value string start 开始日期
 *  @value string end 结束日期
 * @returns Promise
 */
export const getAmountStatisticsByTimeSlot = async (args: any = {}): Promise<any> => {
  const { userId, type = "pay", start, end, expenseId } = args;
  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income
      `)
    )
    .andWhere((builder: any) => {
      expenseId && builder.andWhere({ "t2.id": expenseId });
    })
    .whereRaw(`t1.purchase_time >= '${start}' AND t1.purchase_time < '${end}'`)
    .andWhereRaw(`t1.user_id = ? AND t2.expense_type = ?`, [userId, type])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 获取年、月、日费用统计
 * @param {object} args
 *  @value string userId 用户id
 *  @value string type 费用类型
 *  @value string date 年份或年月
 *  @value string format 年份或年月的格式(YYYY || YYYY-MM)
 * @returns Promise
 */
export const getAmountStatisticsByDate = async (args: any = {}): Promise<any> => {
  const { userId, type = "pay", date, format, expenseId } = args;

  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.amounts ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.amounts ELSE 0 END) AS income
      `)
    )
    .andWhere((builder: any) => {
      expenseId && builder.andWhere({ "t2.id": expenseId });
    })
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ? AND t2.expense_type = ?`, [userId, type])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * @description 统计全年月份收入和支出概括
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
        to_char(t1.purchase_time, 'YYYY-MM') as purchase_time
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, 'YYYY') = ?`, [year])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .groupByRaw(`to_char(t1.purchase_time, 'YYYY-MM')`)
    .orderBy("purchase_time", "ASC");
};

/**
 * @description 统计全年或月份的支出、收入情况
 * @param {object} args
 *  @value string userId 用户 id
 *  @value string date 日期
 *  @value string type 统计类型
 *  @value string format 日期格式
 * @returns Promise
 */
export const statisticalExpenditure = async (args: {
  userId: string;
  date?: string;
  type?: "pay" | "income";
  format?: string;
}): Promise<any> => {
  const { userId, date, type = "pay", format = "YYYY" } = args;

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
 * @description 统计全年、当天、当月费用
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
  const { userId, type = "pay", format = "YYYY" } = args;

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

  const condition = [`t1.user_id = '${userId}'`, `to_char(approximate_at, 'YYYY') = '${year}'`];

  if (expenseId) condition.push(`t2.id = '${expenseId}'`);

  return orm("fund_plan AS t1")
    .joinRaw("JOIN living_expenses AS t2 ON t1.expense_id=t2.id::text")
    .select(orm.raw(`SUM(amounts) AS total`))
    .whereRaw(condition.join(" AND "))
    .whereNotNull("t1.complete_at")
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : { total: 0 }));
};

/**
 * @description 统计消费笔数以及消费详情
 * @param {object} args
 */
export const getStatisticalCostTotalByDate = async (args: any = {}): Promise<any> => {
  const { userId = "", format = "YYYY-MM-DD", groupFormat = "MM-DD", date = "", type = "pay", expenseId } = args;
  const orm = await knex();

  return orm("cost_details AS t1")
    .select(
      orm.raw(
        `to_char(purchase_time, '${groupFormat}') as purchase_time, 
        COUNT(*) AS total, 
        SUM(CASE WHEN t2.expense_type='${type}' THEN t1.amounts ELSE 0 END) AS amounts`
      )
    )
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ? AND t2.expense_type = ?`, [userId, type])
    .andWhere((builder: any) => {
      expenseId && builder.andWhere({ "t2.id": expenseId });
    })
    .whereNull("t1.deleted_at")
    .groupByRaw(`to_char(t1.purchase_time, '${groupFormat}')`)
    .then((rows: any[]) => {
      const useArray = (groupFormat as string).includes("-");

      if (rows?.length) return useArray ? rows : rows[0]?.total || 0;

      return null;
    });
};

/**
 * @description 统计
 * @param {object} args
 */
export const getStatisticalBudget = async (args: any = {}): Promise<any> => {
  const { userId, date, format } = args;

  const orm = await knex();

  return orm("budgets AS t1")
    .select(
      orm.raw(
        `SUM(CASE WHEN t2.amounts != 0 THEN t2.amounts ELSE 0 END) AS amounts, t1.amounts AS original, t3.expense_name, t3.expense_icon, to_char(t1.created_at, 'YYYY-MM') AS created_at`
      )
    )
    .joinRaw(`LEFT JOIN cost_details t2 ON t1.expense_id=t2.expense_id JOIN living_expenses t3 ON t1.expense_id=t3.id::text`)
    .whereRaw(`to_char(t1.created_at, '${format}') = '${date}'`)
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .groupByRaw(`t1.id, t1.amounts, t3.expense_name, t3.expense_icon, to_char(t1.created_at, 'YYYY-MM')`);
};
