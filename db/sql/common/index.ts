import MikrotOrm, { knex } from "db/mikro-orm";
import { EntityName } from "@mikro-orm/core";

/**
 * 根據提供的參數 id 获取用户数据
 * @method getDataByIds
 * @param {object} entityName
 * @param {array} ids
 */
export const getDataByIds = async <T>(entityName: EntityName<unknown>, ids = []): Promise<[T]> => {
  let orm: any = await MikrotOrm();
  orm = orm.createQueryBuilder(entityName);

  if (process.env.SQLType === "sqlite") {
    return orm.where("id in (?) or seq_id in (?)", [ids, ids]).andWhere("deleted_at is null").execute("all");
  }

  if (process.env.SQLType === "pg") {
    return orm.where("array[seq_id::text, id::text] && array[?]", [ids]).andWhere("deleted_at is null").execute("all");
  }
};

/**
 * 根據提供的參數 id 获取用户数据
 * @method getDatabyId
 * @param {object} entityName
 * @param {string} userId 用户的 id
 */
export const getDatabyId = async <T>(entityName: EntityName<unknown>, id: string): Promise<T> => {
  let orm: any = await MikrotOrm();
  orm = orm.createQueryBuilder(entityName);

  return orm.where({ id }).andWhere("deleted_at is null").execute("get");
};

/**
 * 新增信息
 * @method create
 * @param {Object} options
 * @returns Promise
 */
export const create = async <T>(tableName: string, options: T): Promise<T> => {
  const orm = await knex();

  return orm(tableName)
    .insert({ ...options })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 修改记录
 * @method modify
 * @param id
 * @param options
 * @returns Promise
 */
export const modify = async <T>(tableName: string, id: string, options: T): Promise<T> => {
  const orm = await knex();

  return orm(tableName)
    .where({ id })
    .update({ ...options, modified_at: new Date() })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};

/**
 * 删除记录
 * @method remove
 * @param tableName 表名
 * @param id 当前记录id
 * @returns Promise
 */
export const remove = async <T>(tableName: string, id: string): Promise<T> => {
  const orm = await knex();

  return orm(tableName)
    .where({ id })
    .update({ deleted_at: new Date() })
    .returning("*")
    .then((rows) => (rows.length ? rows[0] : null));
};
