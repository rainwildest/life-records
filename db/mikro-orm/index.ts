import MikrotOrm from "db/ormConfig/initialize-database";
import { EntityManager, QueryBuilder } from "@mikro-orm/postgresql";
import { EntityName } from "@mikro-orm/core";
export default async (
  entityName: EntityName<unknown>,
  alias?: string,
  type?: "read" | "write"
): Promise<QueryBuilder> => {
  const orm = await MikrotOrm();
  return (orm.em as EntityManager).createQueryBuilder(entityName, alias, type);
};

export const knex = async (
  type?: "read" | "write"
): Promise<import("knex")<any, unknown[]>> => {
  const orm = await MikrotOrm();
  return (orm.em as EntityManager).getKnex(type);
};
