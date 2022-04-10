import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
// import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import config from "./mikro-orm";

const startOrm = async (): Promise<MikroORM> => MikroORM.init(config);

export default startOrm;
