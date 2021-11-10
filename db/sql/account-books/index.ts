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
  options: AccountBooksSnakeOptions
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
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
  options: AccountBooksSnakeOptions
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return modify("account_books", id, { ...options });
};

/**
 * 删除我的账簿
 * @method removeAccountBooks
 * @param id
 * @returns Promise
 */
export const removeAccountBooks = async (
  id: string
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("account_books", id);
};

/**
 * 获取账簿
 * @method getAccountBooksByUserId
 * @param {string} userId
 * @returns Promise
 */
export const getAccountBooksByUserId = async (
  userId: string
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  const orm = await MikrotOrm(AccountBooks);

  return orm
    .where({ user_id: userId })
    .andWhere("deleted_at is null")
    .orderBy({ ["created_at"]: "DESC" })
    .execute("all");
};

/**
 * @method getAccountBooksById
 * @param {string} id
 * @returns Promise
 */
export const getAccountBooksById = async (
  id: string
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return getDatabyId(AccountBooks, id);
};
