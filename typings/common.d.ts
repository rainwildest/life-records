declare type DateProps = {
  createdAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
};

declare type DateSnakeProps = {
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
};

declare type IDProps = {
  id?: string;
  seqId?: number;
};

declare type IDSnakeProps = {
  id?: string;
  seq_id?: number;
};

declare type DateAndIDFieldProps = DateProps & IDProps;
declare type DateAndIDFieldSnakeProps = DateSnakeProps & IDSnakeProps;

declare type GraphqlContext = {
  user?: UserSnakeProps & DateAndIDFieldSnakeProps;
  loaders?: { user?: any };
};

declare type AmountType = { pay: string; income: string };
