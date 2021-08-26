import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ tableName: "cost_details" })
export default class CostDetails {
  /**
   * @param {string} id uuid
   */
  @Property({ type: "uuid" })
  id: string = v4();

  /**
   * @param {number} seqId 自增长id
   */
  @PrimaryKey({ default: false, fieldName: "seq_id" })
  seqId: number;

  /**
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

  /**
   * @param {string} expense_id 用费ID
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
  @Property({ nullable: true })
  remarks?: Text;

  /**
   * @param {Date} purchaseTime 购买时间
   */
  @Property({
    onUpdate: () => new Date(),
    fieldName: "purchase_time"
  })
  purchaseTime?: Date = new Date();

  /**
   * @param {Date} createdAt 创建时间
   */
  @Property({
    onUpdate: () => new Date(),
    defaultRaw: "current_timestamp",
    fieldName: "created_at"
  })
  createdAt?: Date = new Date();

  /**
   * @param {Date} modifiedAt 修改时间
   */
  @Property({
    nullable: true,
    onUpdate: () => new Date(),
    fieldName: "modified_at"
  })
  modifiedAt?: Date = new Date();

  /**
   * @param {Date} deletedAt 删除时间
   */
  @Property({
    nullable: true,
    onUpdate: () => new Date(),
    fieldName: "deleted_at"
  })
  deletedAt?: Date = new Date();
}
