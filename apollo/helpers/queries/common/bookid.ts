import { getAccountBooksById } from "db/sql/account-books";
import { snakeCase } from "lodash";

export default async (_parent: unknown): Promise<any> => {
  const originField = "bookId";
  const snakeField = snakeCase(originField);

  const snakeValue = _parent[snakeField];
  const value = snakeValue ? snakeValue : _parent[originField];

  if (!value) return null;

  return getAccountBooksById(value);
};
