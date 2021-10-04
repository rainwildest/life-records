import MikrotOrm, { knex } from "db/mikro-orm";

/**
 *
 * @param {string} userId 用户id
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns Promise
 */
export const amountStatisticsByDate = async (
  userId: string,
  start: string,
  end: string
): Promise<any> => {
  const orm = await knex();

  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.expense_price ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.expense_price ELSE 0 END) AS income
      `)
    )
    .whereRaw(`t1.purchase_time >= '${start}' AND t1.purchase_time < '${end}'`)
    .whereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 获取年月或全年费用统计
 * @param {string} userId 用户id
 * @param {string} date 年份或年月
 * @param {string} format 年份或年月的格式(yyyy || yyyy-mm)
 * @returns Promise
 */
export const amountStatisticsByYearsOrMonth = async (
  userId: string,
  date: string,
  format: string
): Promise<any> => {
  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.expense_price ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.expense_price ELSE 0 END) AS income
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 统计全年月份收入和支出概括
 */
export const statisticalGeneralization = async (
  userId: string,
  year: string
): Promise<any> => {
  const orm = await knex();
  return orm("cost_details AS t1")
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .select(
      orm.raw(`
        SUM(CASE WHEN t2.expense_type='pay' THEN t1.expense_price ELSE 0 END) AS pay,
        SUM(CASE WHEN t2.expense_type='income' THEN t1.expense_price ELSE 0 END) AS income,
        to_char(t1.purchase_time, 'yyyy-mm') as purchase_time
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, 'yyyy') = ?`, [year])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .whereNull("t1.deleted_at")
    .groupByRaw("to_char(t1.purchase_time, 'yyyy-mm')")
    .orderBy("purchase_time", "ASC");
};

/**
 * 统计全年或月份的支出情况
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
        SUM(CASE WHEN t2.expense_type='${type}' THEN t1.expense_price ELSE 0 END) AS ${type}, 
        t2.expense_name,
        t2.expense_icon,
        to_char(purchase_time, 'yyyy-mm') as purchase_time 
      `)
    )
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ?`, [userId])
    .andWhereRaw(`t2.expense_type = ?`, [type])
    .whereNull("t1.deleted_at")
    .groupByRaw("t2.expense_name, t2.expense_icon, t1.purchase_time")
    .orderBy("purchase_time", "ASC");
};