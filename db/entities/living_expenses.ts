import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ tableName: "living_expenses" })
export default class LivingExpenses {
  /**
   * @param {string} id uuid
   */
  @Property({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id: string = v4();

  /**
   * @param {number} seqId 自增长id
   */
  @PrimaryKey({ default: false, fieldName: "seq_id" })
  seqId: number;

  /**
   * 如果用户id为空则，则为公共
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

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
