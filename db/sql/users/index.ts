import Users from "db/entities/user";
import MikrotOrm, { knex } from "db/mikro-orm";
import { getDataByIds, getDatabyId, create } from "../common";

/**
 * 保存注册用户信息
 * @memberof UserModel
 * @param {string} username 用户名称
 * @param {string} email 邮箱
 * @param {string} password 密码（md5）
 */
export const addUserBySignUp = async (args: UserSnakeProps): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  const { username, email, password } = args;
  if (!username || !email || !password) return null;

  return create("users", args);
};

/**
 * 使用 oauth 登录时 注册一个新用户
 * @memberof UserModel
 * @param {string} userInfo 保存所需的数据
 */
export const createUserByOauth = async (userInfo: UserSnakeProps): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  return create("users", userInfo);
};

/**
 * 根據提供的參數 user id 或者 seq_id 获取用户数据
 * @memberof UserModel
 * @param {array} ids
 */
export const getUserByIds = async (ids = []): Promise<[UserSnakeProps & DateAndIDFieldSnakeProps]> => {
  return getDataByIds(Users, ids);
};

/**
 * 根據提供的參數 user id 获取用户数据
 * @memberof UserModel
 * @param {string} userId 用户的 id
 */
export const getUserById = async (userId: string): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  return getDatabyId(Users, userId);
};

/**
 * 根據提供的參數 email 获取用户数据
 * @memberof UserModel
 * @param {string} email 邮箱
 */
export const getUserByEmail = async (email: string): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  if (!email) return null;

  const orm = await MikrotOrm();
  return orm.createQueryBuilder(Users).where({ email }).execute("get");
};

/**
 * 验证用户账号密码是否正常
 * @memberof UserModel
 * @param {string} email 邮箱
 * @param {string} password 密码（md5）
 */
export const verifyUserByEmail = async (args: UserSnakeProps): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  const { email, password } = args;
  if (!email && !password) return null;

  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(Users)
    .where({
      email,
      password
    })
    .andWhere("deleted_at is null")
    .execute("get");
};

/**
 * 基於名為 "indexKey" 的欄位 和 indexValue 的值去找一個 user doc
 * @memberof UserModel
 * @param {string} indexName 字段名字
 * @param {string} indexValue 字段值
 */
export const getUserByIndex = async (
  indexName: string,
  indexValue: string
): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  const orm = await MikrotOrm();
  return orm
    .createQueryBuilder(Users)
    .where({
      [indexName]: indexValue
    })
    .andWhere("deleted_at is null")
    .execute("get");
};

/**
 * 根據提供的參數 provider id (資料由第三方登入提供), 和第三方登入的方法，去決定返回一個已存在的 user 還是新增 user
 * @memberof UserModel
 * @param {object} userInfo 保存所需的数据
 * @param {string} providerMethod 第三方 provider id 的字段名
 */
export const createOauthOrFindUser = async (
  userInfo: UserSnakeProps,
  providerMethod: string
): Promise<UserSnakeProps & DateAndIDFieldSnakeProps> => {
  //查找是否存在改用户
  return getUserByIndex(providerMethod, userInfo[providerMethod])
    .then(async (val) => {
      // 如果数据存在 则直接返回
      if (!!val && !!val.id) return val;
      return createUserByOauth(userInfo);
    })
    .catch(() => {
      return null;
    });
};
