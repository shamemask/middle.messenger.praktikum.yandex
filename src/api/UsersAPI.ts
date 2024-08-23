import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";

const authAPIInstance = new HTTPTransport();

export interface ChangeProfileData {
  display_name: string;
  phone: string;
  second_name: string;
  email: string;
  login: string;
  first_name: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const UsersAPI = {
  changeProfile: (data: ChangeProfileData) =>
    authAPIInstance.put(`${API_URL}/user/profile`, {
      data: JSON.stringify(data),
    }),
  changeAvatar: (data: { avatar: string | File }) =>
    authAPIInstance.put(`${API_URL}/user/profile/avatar`, {
      data: JSON.stringify(data),
    }),
  changePassword: (data: ChangePasswordData) =>
    authAPIInstance.put(`${API_URL}/user/password`, {
      data: JSON.stringify(data),
    }),
  searchUserByLogin: (data: { login: string | File }) =>
    authAPIInstance.post(`${API_URL}/user/search`, {
      data: JSON.stringify(data),
    }),
};
