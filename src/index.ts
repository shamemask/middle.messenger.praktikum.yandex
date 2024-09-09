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
import router from "./utils/activateRouter";

const settingsPage = SettingsPage;
const changeDataPage = ChangeDataPage;
const registerPage = RegisterPage;
const notFoundPage = NotFoundPage;
const errorPage = ErrorPage;
const loginPage = LoginPage;
const changePasswordPage = ChangePasswordPage;

router
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
