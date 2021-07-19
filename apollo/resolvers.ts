import {
  QueryResolvers,
  MutationResolvers
} from "./graphql/type-defs.graphqls";
import { queriesHelper, mutationsHelper } from "./resolversHelper";
import { ResolverContext } from "./client";
import GraphQLJSON from "graphql-type-json";

const Query: Required<QueryResolvers<ResolverContext>> = queriesHelper;
const Mutation: Required<MutationResolvers<ResolverContext>> = mutationsHelper;

export default {
  Query,
  Mutation,
  JSON: GraphQLJSON
};
