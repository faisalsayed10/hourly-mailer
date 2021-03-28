export type SignupData = {
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

export type LoginData = {
  email: string;
  password: string;
}