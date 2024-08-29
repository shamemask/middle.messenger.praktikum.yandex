import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";

const authAPIInstance = new HTTPTransport();

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type UserDataWithPassword = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  password: string;
};

export type CompleteUserData = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
};

export const AuthAPI = {
  login: (data: AuthData) =>
    authAPIInstance.post(`${API_URL}/auth/signin`, {
      data: JSON.stringify(data),
    }),
  register: (data: UserDataWithPassword) =>
    authAPIInstance.post(`${API_URL}/auth/signup`, {
      data: JSON.stringify(data),
    }),
  logout: () => authAPIInstance.post(`${API_URL}/auth/logout`),
  getUser: () => authAPIInstance.get(`${API_URL}/auth/user`),
};
