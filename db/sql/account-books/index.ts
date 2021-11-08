import FundPlan from "db/entities/fund-plan";
import MikrotOrm, { knex } from "db/mikro-orm";
import { create, modify, remove } from "../common";

/**
 * 新增我的账簿
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
 * @param id
 * @returns Promise
 */
export const removeAccountBooks = async (
  id: string
): Promise<AccountBooksSnakeOptions & DateAndIdSQLFieldSnakeOption> => {
  return remove("account_books", id);
};
