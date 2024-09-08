// assuming AuthAPI is imported from another file

import { AuthAPI } from "../api/AuthAPI.ts";
import router from "./Router.ts";
import { showError } from "./validator.ts";
import store from "./Store.ts";

export interface AuthData {
  login: string;
  password: string;
}

export function handleUserAuthAndGo(data: AuthData, event: Event, route = "/") {
  handleUserIsAuth()
    .then((user) => {
      if (user instanceof Error) {
        handleUserAuth(data, event, route);
      } else {
        console.log(user);
        saveUserGo(user, event, route);
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Обработка ошибок
      handleUserAuth(data, event, route);
    });
}

export function handleUserAuth(data: AuthData, event: Event, route = "") {
  AuthAPI.login({
    login: data.login,
    password: data.password,
  })
    .then(() => {
      // После успешной авторизации пытаемся получить данные о пользователе
      return handleUserIsAuth();
    })
    .then((userInfo) => {
      console.log(userInfo); // Обработка данных о пользователе
      saveUserGo(userInfo, event, route);
    })
    .catch((error) => {
      console.error("Error:", error); // Обработка ошибок
      showError("login", error.message);
      return;
    });
}

export function handleUserIsAuth(): Promise<string | object | unknown> {
  return AuthAPI.getUser();
}

function saveUser(user: string | object | unknown) {
  if (typeof user === "string") {
    const parsedUser = JSON.parse(user);
    store.setState({ user: parsedUser });
  } else {
    store.setState({ user });
  }
}

export function saveUserGo(
  user: string | object | unknown,
  event: Event,
  route = "/",
) {
  saveUser(user);
  event.preventDefault();
  if (!route) {
    return;
  }
  router.go(route);
}
