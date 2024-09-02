import { HTTPTransport } from "../utils/HTTPTransport";
import { API_URL } from "../config";
import { CompleteUserData } from "./AuthAPI.ts";

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
    authAPIInstance
      .put(`${API_URL}/user/profile`, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении changeProfile:", error);
        throw error;
      }),

  changeAvatar: (data: FormData) =>
    authAPIInstance
      .put(`${API_URL}/user/profile/avatar`, {
        data: data,
      })
      .then((data) => {
        const userData = JSON.parse(data as string) as CompleteUserData; // Type assertion here
        userData.avatar = `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`;
        return userData;
      })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении changeAvatar:", error);
        throw error;
      }) as Promise<CompleteUserData>,

  changePassword: (data: ChangePasswordData) =>
    authAPIInstance
      .put(`${API_URL}/user/password`, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении changePassword:", error);
        throw error;
      }),

  searchUserByLogin: (data: { login: string | File }) =>
    authAPIInstance
      .post(`${API_URL}/user/search`, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      })
      .then((data) => {
        const userData = JSON.parse(data as string) as CompleteUserData; // Type assertion here
        userData.avatar = `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`;
        return userData;
      })
      .catch((error: Error) => {
        console.error("Ошибка при выполнении searchUserByLogin:", error);
        throw error;
      }) as Promise<CompleteUserData>,
};
