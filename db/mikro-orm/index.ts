import MikrotOrm from "db/config/initialize-database";
import { EntityManager, QueryBuilder } from "@mikro-orm/postgresql";
import { EntityName } from "@mikro-orm/core";

const _MikrotOrm = MikrotOrm();

export default async (
  entityName: EntityName<unknown>,
  alias?: string,
  type?: "read" | "write"
): Promise<QueryBuilder> => {
  const orm = await _MikrotOrm;
  return (orm.em as EntityManager).createQueryBuilder(entityName, alias, type);
};

export const knex = async (type?: "read" | "write"): Promise<any> => {
  const orm = await _MikrotOrm;
  return (orm.em as EntityManager).getKnex(type);
};
