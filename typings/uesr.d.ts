declare type UserOptions = SQLFieldOption & {
  id: string;
  seq_id?: number;
  username?: string;
  birthday?: string;
  gender?: string;
  email?: string;
  github_provider_id?: string;
  google_provider_id?: string;
  phone_number?: string;
  password?: string;
  avatar?: string;
  is_admin?: boolean;
  is_verify?: boolean;
  jurisdiction?: string[];
};
