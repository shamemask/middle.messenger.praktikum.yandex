import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";

const authAPIInstance = new HTTPTransport();

export const AuthAPI = {
  login: (data: { login: string | File; password: string | File }) =>
    authAPIInstance.post(`${API_URL}/auth/signin`, {
      data: JSON.stringify(data),
    }),
  register: (data: {
    password: string;
    phone: string;
    second_name: string;
    email: string;
    login: string;
    first_name: string;
  }) =>
    authAPIInstance.post(`${API_URL}/auth/signup`, {
      data: JSON.stringify(data),
    }),
  logout: () => authAPIInstance.post(`${API_URL}/auth/logout`),
  getUser: () => authAPIInstance.get(`${API_URL}/auth/user`),
};
