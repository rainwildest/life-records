import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "fund_plan", comment: "资金计划" })
export default class FundPlan extends SQLCommonField {
  /**
   * @param {string} expense_id 费用类型ID
   */
  @Property({ fieldName: "expense_id" })
  expenseId: string;

  /**
   * @param {string} name 计划名称
   */
  @Property({ nullable: true })
  name: string;

  /**
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

  /**
   * @param {number} amounts 金额
   */
  @Property({ fieldName: "amounts", default: 0 })
  amounts: number;

  /**
   * @param {string} approximateAt 大概的
   */
  @Property({
    nullable: true,
    fieldName: "approximate_at",
    onUpdate: () => new Date()
  })
  approximateAt: Date = new Date();

  /**
   * @param {boolean} completeAt 完成时间
   */
  @Property({
    nullable: true,
    fieldName: "complete_at",
    onUpdate: () => new Date()
  })
  completeAt: Date = new Date();
}
