import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

/**
 * 用户信息
 */
@Entity()
export default class Users {
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
   * @param {string} username 账号名称
   */
  @Property({ nullable: true })
  username?: string;

  /**
   * @param {string} birthday 生日
   */
  @Property({ nullable: true })
  birthday?: string;

  /**
   * @param {string} gender 性别
   */
  @Property({ nullable: true })
  gender?: string;

  /**
   * @param {string} email 邮箱
   */
  @Property({ nullable: true })
  email: string;

  /**
   * @param {string} githubProviderId GitHub oauth
   */
  @Property({ nullable: true, fieldName: "github_provider_id" })
  githubProviderId?: string;

  /**
   * @param {string} googleProviderId Google oauth
   */
  @Property({ nullable: true, fieldName: "google_provider_id" })
  googleProviderId?: string;

  /**
   * @param {string} phoneNumber 手机号码
   */
  @Property({ nullable: true, fieldName: "phone_number" })
  phoneNumber?: string;

  /**
   * @param {string} password 密码
   */
  @Property({ nullable: true })
  password?: string;

  /**
   * @param {string} avatar 头像
   */
  @Property({ nullable: true })
  avatar?: string;

  /**
   * @param {boolean} isAdmin 是否为管理员
   */
  @Property({ default: false, fieldName: "is_admin" })
  isAdmin?: boolean;

  /**
   * @param {boolean} isVerify 邮箱是否验证
   */
  @Property({ default: false, fieldName: "is_verify" })
  isVerify: boolean;

  /**
   * @param {array} jurisdiction 用户权限
   */
  @Property({ nullable: true })
  jurisdiction?: string;

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
