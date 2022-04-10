import { QueryResolvers, MutationResolvers } from "@graphql-types@";
import { queriesHelpers, mutationsHelpers, queriesCustom } from "./helpers";
import { ResolverContext } from "./client";
import GraphQLJSON from "graphql-type-json";
import GraphQLDate from "graphql-date";

const Query: Required<QueryResolvers<ResolverContext>> = queriesHelpers;
const Mutation: Required<MutationResolvers<ResolverContext>> = mutationsHelpers;

export default {
  Query,
  ...queriesCustom,
  Mutation,
  JSON: GraphQLJSON,
  Date: GraphQLDate
};
