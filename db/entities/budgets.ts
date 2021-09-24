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
   * @param {string} amount 预算金额
   */
  @Property({ fieldName: "amount" })
  amount: string;
}
