import MikrotOrm from "db/config/initialize-database";
import { EntityManager, AbstractSqlDriver, AbstractSqlConnection } from "@mikro-orm/postgresql";

const _MikrotOrm = MikrotOrm();

export default async (): Promise<EntityManager<AbstractSqlDriver<AbstractSqlConnection>>> => {
  const orm = await _MikrotOrm;

  // @ts-ignore
  return orm.em as EntityManager;
};

export const knex = async (type?: "read" | "write"): Promise<any> => {
  const orm = await _MikrotOrm;
  return (orm.em as EntityManager).getKnex(type);
};
