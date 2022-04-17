import { ApolloServer } from "apollo-server-micro";
import { schema } from "apollo/schema";
import createLoaders from "apollo/loaders";
import { snakeCase } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession } from "lib/apis/auth";
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

let apolloServerHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    apolloServerHandler = new ApolloServer({
      fieldResolver: (_source, _args, _contextValue, _info) =>
        typeof _source[snakeCase(_info.fieldName)] !== "undefined"
          ? _source[snakeCase(_info.fieldName)]
          : _source[_info.fieldName],
      schema,
      async context(_ctx) {
        const user = await getLoginSession(_ctx.req);
        return {
          ..._ctx,
          loaders: createLoaders,
          user
        };
      },
      tracing: true,
      playground: {
        settings: {
          "request.credentials": "include"
        }
      },
      introspection: process.env.NODE_ENV === "development"
    }).createHandler({
      path: "/api/graphql"
    });
  }
  return apolloServerHandler;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export const config = { api: { bodyParser: false } };
