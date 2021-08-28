import MikrotOrm from "db/mikro-orm";
import { EntityName } from "@mikro-orm/core";

/**
 * 根據提供的參數 id 获取用户数据
 * @memberof Model
 * @param {object} entityName
 * @param {array} ids
 */
export const getDataByIds = async <T>(
  entityName: EntityName<unknown>,
  ids = []
): Promise<[T]> => {
  const orm = await MikrotOrm(entityName);

  if (process.env.SQLType === "sqlite") {
    return orm
      .where("id in (?) or seq_id in (?)", [ids, ids])
      .andWhere("deleted_at is null")
      .execute("all");
  }

  if (process.env.SQLType === "pg") {
    return orm
      .where("array[seq_id::text, id::text] && array[?]", [ids])
      .andWhere("deleted_at is null")
      .execute("all");
  }
};

/**
 * 根據提供的參數 id 获取用户数据
 * @memberof Model
 * @param {object} entityName
 * @param {string} userId 用户的 id
 */
export const getDatabyId = async <T>(
  entityName: EntityName<unknown>,
  userId: string
): Promise<[T]> => {
  const orm = await MikrotOrm(entityName);

  return orm
    .where({ id: userId })
    .andWhere("deleted_at is null")
    .execute("get");
};
