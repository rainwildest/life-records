import { ApolloServer } from "apollo-server-micro";
import { schema } from "apollo/schema";
import createLoaders from "apollo/loaders";
import { snakeCase } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

// const apolloServer = new ApolloServer({
//   fieldResolver: (source, args, contextValue, info) =>
//     typeof source[snakeCase(info.fieldName)] !== "undefined"
//       ? source[snakeCase(info.fieldName)]
//       : source[info.fieldName],
//   schema,
//   context(ctx) {
//     return { ...ctx, loaders: createLoaders, em: orm.em as EntityManager };
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// export default apolloServer.createHandler({ path: "/api/graphql" });

let apolloServerHandler: (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    apolloServerHandler = new ApolloServer({
      fieldResolver: (_source, _args, _contextValue, _info) =>
        typeof _source[snakeCase(_info.fieldName)] !== "undefined"
          ? _source[snakeCase(_info.fieldName)]
          : _source[_info.fieldName],
      schema,
      context(_ctx) {
        return { ..._ctx, loaders: createLoaders };
      }
    }).createHandler({
      path: "/api/graphql"
    });
  }
  return apolloServerHandler;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export const config = { api: { bodyParser: false } };
