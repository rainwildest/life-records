declare type DateSQLOptions = {
  createdAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
};

declare type DateSQLSnakeOptions = {
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
};

declare type IDSQLOptions = {
  id?: string;
  seqId?: number;
};

declare type IDSQLSnakeOptions = {
  id?: string;
  seq_id?: number;
};

declare type DateAndIdSQLFieldOption = DateSQLOptions & IDSQLOptions;
declare type DateAndIdSQLFieldSnakeOption = DateSQLSnakeOptions & IDSQLSnakeOptions;

declare type GraphqlContext = {
  user?: UserSnakeOptions & DateAndIdSQLFieldSnakeOption;
  loaders?: { user?: any };
};

declare type AmountType = { pay: string; income: string };
