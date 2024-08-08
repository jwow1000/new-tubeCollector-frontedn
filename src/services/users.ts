// this is the users services 
import api from "./api-config.ts";
import { UserCred, User } from "../lib/types.ts";

// // types
// interface VerifyUserResponse {
//   access: string;
//   user: User; // Replace `any` with the appropriate user type
// }


export const signUp = async (credentials: UserCred) => {
  console.log("sign up credentials", credentials);
  try {
    const resp = await api.post("/users/register/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.log('sign up failed');
    throw error;
  }
};

export const Login = async (credentials: UserCred) => {
  try {
    console.log("Login Creds", credentials);
    const resp = await api.post("/users/login/", credentials);
    console.log("Login response: ", resp);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    console.log("damn")
    throw null;
    // throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem('token');
    // delete api.defaults.headers.common['Authorization'];
    return true;
  } catch (error) {
    console.log("sign out failed");
    throw error;
  }
};

// export const verifyUser = async () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const resp = await api.get("/users/token/refresh/");
//     localStorage.setItem("token", resp.data.access);
//     return resp.data.user;
//   } else {
//     console.log('NOT VERIFIED')
//   }
//   return false;
// };

export const verifyUser = async (): Promise<User | boolean> => {
  const token = localStorage.getItem("token");
  console.log("acces token: ", token)
  if (token) {
    try {
      // Set the token in the headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const resp = await api.get<User>("/users/token/refresh");
      return resp.data;
    } catch(error) {
      console.log("user vereification failed", error);
      return false;
    }
  } else {
    console.log('NOT VERIFIED');
    return false;
  }
};

