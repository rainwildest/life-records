import entities from "../entities";
import { Options } from "@mikro-orm/core";

const isDev = process.env.NODE_ENV === "development";

const config: Options = {
  // dbName: `${process.cwd()}/db/life.db`,
  dbName: `life-portrayal${isDev ? "-dev" : ""}`,
  type: "postgresql",
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "",
  entities: [...entities],
  debug: isDev,
  migrations: {
    // tableName: 'mikro_orm_migrations', // migrations table name
    glob: "!(*.d).{js,ts}",
    path: `${process.cwd()}/db/migrations`, // path to folder with migration files
    emit: "ts"
    // pattern: /^[\w-]+\d+\.[tj]s$/
  }
};

export default config;
