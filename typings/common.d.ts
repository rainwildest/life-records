declare type DateSQLOption = {
  createdAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
};

declare type DateSQLSnakeOptions = {
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
};

declare type IDSQLOption = {
  id?: string;
  seqId?: number;
};

declare type IDSQLSnakeOptions = {
  id?: string;
  seq_id?: number;
};

declare type SQLFieldOption = DateSQLOption & IDSQLOption;
