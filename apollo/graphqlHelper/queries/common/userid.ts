import { snakeCase, keys } from "lodash";

export default (_parent: CostDetailsOption, _: unknown, _context): any => {
  const fields: { [key: string]: any } = {};
  keys(_parent).forEach((key) => {
    fields[snakeCase(key)] = _parent[key];
  });

  const { user_id } = fields || {};
  if (!user_id) return null;

  const { loaders } = _context;
  return loaders.user.load(user_id);
};
