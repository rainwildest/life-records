import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "living_expenses", comment: "费用类型表" })
export default class LivingExpenses extends SQLCommonField {
  /**
   * 如果用户id为空则，则为公共
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

  /**
   * 图标
   * @param icon 图标名称
   */
  @Property({ nullable: true, fieldName: "expense_icon" })
  expenseIcon?: string;

  /**
   * @param {string} expense_type 费用类型（收入：income；支出：pay）
   */
  @Property({ nullable: true, fieldName: "expense_type" })
  expenseType?: string;

  /**
   * @param {string} expense_name 费用名称
   */
  @Property({ nullable: true, fieldName: "expense_name" })
  expenseName?: string;
}
