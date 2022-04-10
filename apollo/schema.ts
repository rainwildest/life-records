import { join } from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import graphQLLetConfig from ".graphql-let.yml";
import resolvers from "./resolvers";

console.log(join(process.cwd(), graphQLLetConfig.schema));
const loadedFiles = loadFilesSync(join(process.cwd(), graphQLLetConfig.schema));
const typeDefs = mergeTypeDefs(loadedFiles);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/* 每次执行graphql之前都去查询一下 currentUser */
// const rootResolveFunction = async (
//   _parent: any,
//   _args: any,
//   _context: any,
//   info: any
// ) => {
//   if (!!info && !!info.operation && !!info.operation.__runAtMostOnce) {
//     delete info.operation.__runAtMostOnce;
//   }
//   const { loaders, req } = _context;
//   const session = await getLoginSession(req);
//   // perform action before any other resolvers

//   _context.currentUser = null;
//   if (!!session && !!session.id) {
//     _context.currentUser = await loaders.user.load(session.id);
//     if (!_context.currentUser) {
//       throw new AuthenticationError(
//         "This account has been deleted or deactivated"
//       );
//     }
//   }
// };

// addSchemaLevelResolveFunction(schema, rootResolveFunction);
