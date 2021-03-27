import { Error, SignupData } from "./types";

const isEmail = (email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (str: string) => {
  if (str.trim() === "") return true;
  else return false;
};

const hasWhiteSpace = (str: string) => {
  return /\s/g.test(str);
};

export const validateSignupData = (data: SignupData) => {
  let errors: Error = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email) || data.email.length > 50) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  if (data.password.length < 8) errors.password = "Password is too short";

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match, try again!";

  if (isEmpty(data.username)) errors.username = "Username must not be empty";
  if (hasWhiteSpace(data.username))
    errors.username = "Username cannot contain a whitespace";
  if (data.username.length > 20) errors.username = "Username is too long";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
