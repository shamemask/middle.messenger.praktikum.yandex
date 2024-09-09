import "./index.scss";
import {
  ChangeAvatarPage,
  ChangeDataPage,
  ChangePasswordPage,
  ChatPage,
  ErrorPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SettingsPage,
} from "./pages";
import Router from "./utils/Router.ts";

const router = new Router("app");
const settingsPage = SettingsPage;
const changeDataPage = ChangeDataPage;
const registerPage = RegisterPage;
const notFoundPage = NotFoundPage;
const errorPage = ErrorPage;
const loginPage = LoginPage;
const changePasswordPage = ChangePasswordPage;

export default router
  .use("/", loginPage)
  .use("/login", loginPage)
  .use("/sign-up", registerPage)
  .use("/settings", settingsPage)
  .use("/messenger", ChatPage)
  .use("/change-data", changeDataPage)
  .use("/change-password", changePasswordPage)
  .use("/change-avatar", ChangeAvatarPage)
  .use("/not-found", notFoundPage)
  .use("/error", errorPage)
  .start();
