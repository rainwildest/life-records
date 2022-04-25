import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "budgets", comment: "预算表" })
export default class Budgets extends SQLCommonField {
  /**
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

  /**
   * @param {string} expense_id 费用类型ID
   */
  @Property({ fieldName: "expense_id" })
  expenseId: string;

  /**
   * @param {string} amounts 金额
   */
  @Property({ fieldName: "amounts", default: 0 })
  amounts: number;

  /**
   * @param {string} monthly 按月
   */
  // @Property({ nullable: null, fieldName: "by_month" })
  // byMonth: boolean;
}
