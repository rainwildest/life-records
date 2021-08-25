declare type DateSQLOption = {
  createdAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
};

declare type IDSQLOption = {
  id?: string;
  seqId?: number;
};

declare type SQLFieldOption = DateSQLOption & IDSQLOption;
