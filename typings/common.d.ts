import { any } from "prop-types";
import React from "react";

declare type DateSQLOption = {
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
};

declare type IDSQLOption = {
  id: string;
  seq_id?: number;
};

declare type SQLFieldOption = DateSQLOption & IDSQLOption;

declare module "*.yml";
declare module "*.graphqls" {
  import { DocumentNode } from "graphql";
  export default typeof DocumentNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wired-card": any;
      "wired-calendar": any;
      "wired-button": any;
    }
  }
}
