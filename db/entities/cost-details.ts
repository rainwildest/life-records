import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "cost_details", comment: "生活费用记录表" })
export default class CostDetails extends SQLCommonField {
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
   * @param {string} expense_price 金额
   */
  @Property({ nullable: true, fieldName: "expense_price", default: 0 })
  expensePrice?: number;

  /**
   * @param {text} remarks 备注
   */
  @Property({ nullable: true, type: "text" })
  remarks?: string;

  /**
   * @param {Date} purchaseTime 购买时间
   */
  @Property({
    onUpdate: () => new Date(),
    fieldName: "purchase_time"
  })
  purchaseTime?: Date = new Date();
}
