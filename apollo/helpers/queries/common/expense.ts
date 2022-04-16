// import { UserInputError } from "apollo-server-micro";
import { getLivingExpense } from "db/sql/living-expenses";
import { snakeCase } from "lodash";

export default (_parent: unknown): Promise<any> => {
  const originField = "expenseId";
  const snakeField = snakeCase(originField);

  const snakeValue = _parent[snakeField];
  const value = snakeValue ? snakeValue : _parent[originField];

  if (!value) return null;
  return getLivingExpense(value);
};
