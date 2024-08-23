import "./index.scss";
import {
  ChangeDataPage,
  ErrorPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SettingsPage,
} from "./pages";
import Router from "./utils/Router.ts";

const settingsPage = SettingsPage;
const changeDataPage = ChangeDataPage;
const registerPage = RegisterPage;
const notFoundPage = NotFoundPage;
const errorPage = ErrorPage;
const loginPage = LoginPage;

export default Router.use("/", loginPage)
  .use("/login", loginPage)
  .use("/sign-up", registerPage)
  .use("/settings", settingsPage)
  .use("/change-data", changeDataPage)
  .use("/not-found", notFoundPage)
  .use("/error", errorPage)
  .start();
