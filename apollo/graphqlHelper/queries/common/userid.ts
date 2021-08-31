import { snakeCase, keys } from "lodash";

export default (_parent: CostDetailsOption, _: unknown, _context): any => {
  const originField = "userId";
  const snakeField = snakeCase(originField);

  const snakeValue = _parent[snakeField];
  const value = snakeValue ? snakeValue : _parent[originField];

  if (!value) return null;

  const { loaders } = _context;
  return loaders.user.load(value);
};
