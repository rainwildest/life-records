import { PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

export class SQLCommonField {
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
