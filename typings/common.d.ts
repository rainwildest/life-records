declare type DateSQLOption = {
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
};

declare type IDSQLOption = {
  id?: string;
  seq_id?: number;
};

declare type SQLFieldOption = DateSQLOption & IDSQLOption;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wired-card": any;
      "wired-calendar": any;
      "wired-button": any;
      "wired-dialog": any;
      "wired-icon-button": any;
    }
  }
}
