export type SignupData = {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Error = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  message?: string;
};
