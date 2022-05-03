import CostDetails from "db/entities/cost-details";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";

/**
 * 新增用户消费记录
 * @method createCostDetail
 * @param {Object} options 新增记录参数
 * @returns Promise
 */
export const createCostDetail = async (
  options: CostDetailsSnakeProps
): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  return create("cost_details", options);
};

/**
 * 修改用户消费记录
 * @method modifyCostDetail
 * @param {Object} options 修改记录参数
 * @returns Promise
 */
export const modifyCostDetail = async (
  id: string,
  options: CostDetailsSnakeProps
): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  return modify("cost_details", id, options);
};

/**
 * 删除用户消费记录
 * @method removeCostDetail
 * @param id
 * @returns Promise
 */
export const removeCostDetail = async (id: string): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  return remove("cost_details", id);
};

/**
 * 获取用户的消费记录
 * @method getCostDetails
 * @param {string} userId 用户id
 * @returns Promise
 */
export const getCostDetails = async (args: any = {}): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  const orm = await MikrotOrm();
  return orm
    .createQueryBuilder(CostDetails)
    .where(args)
    .andWhere("deleted_at is null")
    .orderBy({ ["purchase_time"]: "DESC" })
    .execute("all");
};

/**
 * 通过时间段获取用户的消费记录
 * @method getCostDetailsByTimeSlot
 * @param {object} args
 *  @value string userId 用户id
 *  @value string type 费用类型
 *  @value string start 开始日期
 *  @value string end 结束日期
 * @returns Promise
 */
export const getCostDetailsByTimeSlot = async (args: any = {}): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, type = "pay", start, end } = args;

  const orm = await knex();

  return orm("cost_details AS t1")
    .select(["t1.*"])
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .whereRaw("t1.purchase_time >= ? and t1.purchase_time < ?", [start, end])
    .andWhereRaw(`t1.user_id = ? AND t2.expense_type = ?`, [userId, type])
    .whereNull("t1.deleted_at")
    .orderBy("t1.purchase_time", "DESC")
    .then((rows: any[]) => (rows.length ? rows : null));
};

/**
 * 获取年、月、日数据
 * @method getCostDetailsByDate
 * @param {object} args
 *  @value string userId 用户id
 *  @value string type 费用类型
 *  @value string date 年份或年月
 *  @value string format 年份/年月/年月日的格式(YYYY || YYYY-MM || YYYY-MM-DD)
 * @returns Promise
 */
export const getCostDetailsByDate = async (args: any = {}): Promise<CostDetailsSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, type = "pay", date, format, expenseId } = args;
  const orm = await knex();

  return orm("cost_details AS t1")
    .select(["t1.*"])
    .joinRaw("JOIN living_expenses t2 ON t1.expense_id=t2.id::text")
    .whereRaw(`to_char(t1.purchase_time, '${format}') = ?`, [date])
    .andWhereRaw(`t1.user_id = ? AND t2.expense_type = ?`, [userId, type])
    .andWhere((builder: any) => {
      expenseId && builder.andWhere({ "t2.id": expenseId });
    })
    .whereNull("t1.deleted_at")
    .orderBy("t1.purchase_time", "DESC")
    .then((rows: any[]) => (rows.length ? rows : null));
};
