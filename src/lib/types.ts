// define user credentials for login
export type UserCred =  {
  username: string;
  password: string;
  isError: boolean;
  errorMsg: string;
}

// define global user type
export type User = {
  username: string;
  id: string;
};