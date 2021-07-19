import entities from "./entities";
import { Options } from "@mikro-orm/core";
// import path from "path";

// console.log("123456", path.resolve("db/life.db"));
const config: Options = {
  dbName: `${process.cwd()}/db/life.db`,
  type: "sqlite",
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "",
  entities: [...entities],
  debug: process.env.NODE_ENV === "development",
  migrations: {
    // tableName: 'mikro_orm_migrations', // migrations table name
    path: `${process.cwd()}/db/ormConfig/migrations`, // path to folder with migration files
    pattern: /^[\w-]+\d+\.[tj]s$/
  }
};

export default config;
