import { Entity, Property } from "@mikro-orm/core";
import { SQLCommonField } from "./common";

@Entity({ tableName: "account_books", comment: "我的账簿" })
export default class AccountBooks extends SQLCommonField {
  /**
   * @param {string} name 账簿名称
   */
  @Property({ fieldName: "name" })
  name: string;

  /**
   * @param {string} userId 用户 ID
   */
  @Property({ nullable: true, fieldName: "user_id" })
  userId?: string;
}
