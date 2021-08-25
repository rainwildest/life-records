declare type UserOptions = {
  username?: string;
  birthday?: string;
  gender?: string;
  email?: string;
  githubProviderId?: string;
  googleProviderId?: string;
  phoneNumber?: string;
  password?: string;
  avatar?: string;
  isAdmin?: boolean;
  isVerify?: boolean;
} & DateSQLOption;
