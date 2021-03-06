import { snakeCase } from "lodash";

export default (_parent: unknown, _: unknown, _context: unknown): any => {
  const originField = "userId";
  const snakeField = snakeCase(originField);

  const snakeValue = _parent[snakeField];
  const value = snakeValue ? snakeValue : _parent[originField];

  if (!value) return null;

  const { loaders } = _context as GraphqlContext;
  return loaders.user.load(value);
};
