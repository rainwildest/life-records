import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "config", comment: "配置表" })
export default class Config extends SQLCommonField {
  /**
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;

  /**
   * @param {boolean} hasBudget 是否开启预算
   */
  @Property({ default: false, fieldName: "has_budget" })
  hasBudget: boolean;
}
