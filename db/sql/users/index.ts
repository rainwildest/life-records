import Users from "db/entities/user";
// import { UserOptions } from "typings/uesr";
import MikrotOrm, { knex } from "db/mikro-orm";
import { getDataByIds, getDatabyId } from "../common";

/**
 * 保存注册用户信息
 * @memberof UserModel
 * @param {string} username 用户名称
 * @param {string} email 邮箱
 * @param {string} password 密码（md5）
 */
export const addUserBySignUp = async (
  args: UserOptions
): Promise<UserOptions & IDSQLOption> => {
  const { username, email, password } = args;
  if (!username || !email || !password) {
    return null;
  }

  const orm = await knex();
  return orm("users")
    .insert({ ...args })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 使用 oauth 登录时 注册一个新用户
 * @memberof UserModel
 * @param {string} userInfo 保存所需的数据
 */
export const addUserByOauth = async (
  userInfo: UserOptions
): Promise<UserOptions & IDSQLOption> => {
  const orm = await knex();

  return orm("users")
    .insert({ ...userInfo })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 根據提供的參數 user id 或者 seq_id 获取用户数据
 * @memberof UserModel
 * @param {array} ids
 */
export const getUserByIdsQuery = async (
  ids = []
): Promise<[UserOptions & IDSQLOption]> => {
  return getDataByIds(Users, ids);
};

/**
 * 根據提供的參數 user id 获取用户数据
 * @memberof UserModel
 * @param {string} userId 用户的 id
 */
export const getUserByIdQuery = async (
  userId: string
): Promise<UserOptions & IDSQLOption> => {
  return getDatabyId(Users, userId);
};

/**
 * 根據提供的參數 email 获取用户数据
 * @memberof UserModel
 * @param {string} email 邮箱
 */
export const getUserByEmailQuery = async (
  email: string
): Promise<UserOptions & IDSQLOption> => {
  if (!email) {
    return null;
  }

  const orm = await MikrotOrm(Users);
  return orm.where({ email }).execute("get");
};

/**
 * 验证用户账号密码是否正常
 * @memberof UserModel
 * @param {string} email 邮箱
 * @param {string} password 密码（md5）
 */
export const verifyUserQuery = async (
  args: UserOptions
): Promise<UserOptions & IDSQLOption> => {
  const { email, password } = args;
  if (!email && !password) {
    return null;
  }

  const orm = await MikrotOrm(Users);
  return orm
    .where({
      email,
      password
    })
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
): Promise<UserOptions & IDSQLOption> => {
  const orm = await MikrotOrm(Users);
  return orm
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
export const oauthCreateOrFindUser = async (
  userInfo: UserOptions,
  providerMethod: string
): Promise<UserOptions & IDSQLOption> => {
  //查找是否存在改用户
  return getUserByIndex(providerMethod, userInfo[providerMethod])
    .then((val) => {
      // 如果数据存在 则直接返回
      if (!!val && !!val.id) {
        return val;
      }

      // 不存在当前用户，则去新增
      return addUserByOauth(userInfo);
    })
    .catch(() => {
      return null;
    });
};
