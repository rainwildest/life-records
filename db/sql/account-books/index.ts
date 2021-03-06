import AccountBooks from "db/entities/account-books";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove, getDatabyId } from "../common";

/**
 * 新增我的账簿
 * @method createAccountBooks
 * @param {Object} options
 * @returns Promise
 */
export const createAccountBooks = async (
  options: AccountBooksSnakeProps
): Promise<AccountBooksSnakeProps & DateAndIDFieldSnakeProps> => {
  return create("account_books", { ...options });
};

/**
 * 修改我的账簿
 * @method modifyAccountBooks
 * @param id
 * @param options
 * @returns Promise
 */
export const modifyAccountBooks = async (
  id: string,
  options: AccountBooksSnakeProps
): Promise<AccountBooksSnakeProps & DateAndIDFieldSnakeProps> => {
  return modify("account_books", id, { ...options });
};

/**
 * 删除我的账簿
 * @method removeAccountBooks
 * @param id
 * @returns Promise
 */
export const removeAccountBooks = async (id: string): Promise<AccountBooksSnakeProps & DateAndIDFieldSnakeProps> => {
  return remove("account_books", id);
};

/**
 * 获取账簿
 * @method getAccountBooksByUserId
 * @param {string} userId
 * @returns Promise
 */
export const getAccountBooksByUserId = async (args: any = {}): Promise<AccountBooksSnakeProps & DateAndIDFieldSnakeProps> => {
  const { userId, isNotIn = true, ids } = args;

  let str = "";
  ids?.forEach((key) => {
    str += `${str ? "," : ""}'${key}'`;
  });

  const inSQL = ids ? `id ${isNotIn ? "not" : ""} in (${str})` : "";
  const sql = `${inSQL ? `${inSQL} AND ` : ""}user_id='${userId}'`;

  const orm = await MikrotOrm();

  return orm
    .createQueryBuilder(AccountBooks)
    .where(sql)
    .andWhere("deleted_at is null")
    .orderBy({ ["created_at"]: "DESC" })
    .execute("all");
};

/**
 * @method getAccountBooksById
 * @param {string} id
 * @returns Promise
 */
export const getAccountBooksById = async (id: string): Promise<AccountBooksSnakeProps & DateAndIDFieldSnakeProps> => {
  return getDatabyId(AccountBooks, id);
};
