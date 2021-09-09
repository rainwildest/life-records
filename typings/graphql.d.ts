declare module "*.graphqls" {
  import { DocumentNode } from "typings/graphql";
  export default typeof DocumentNode;
}

declare module "*.yml";
