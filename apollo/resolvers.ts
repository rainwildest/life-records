import { QueryResolvers, MutationResolvers } from "__generated__/__types__";
import { queriesHelper, mutationsHelper, queriesCustom } from "./graphqlHelper";
import { ResolverContext } from "./client";
import GraphQLJSON from "graphql-type-json";
import GraphQLDate from "graphql-date";

const Query: Required<QueryResolvers<ResolverContext>> = queriesHelper;
const Mutation: Required<MutationResolvers<ResolverContext>> = mutationsHelper;

export default {
  Query,
  ...queriesCustom,
  Mutation,
  JSON: GraphQLJSON,
  Date: GraphQLDate
};
