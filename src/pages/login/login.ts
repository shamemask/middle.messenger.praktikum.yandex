import Block from "../../utils/Block";
import template from "./login.hbs?raw";
import "./login.scss";
import {
  Button,
  Dialog,
  InputField,
  Link,
  Main,
  PageTitle,
} from "../../components";
import { connect } from "../../utils/Hoc.ts";
import router from "../../utils/Router.ts";
import { AuthData, handleUserAuthAndGo } from "../../utils/authHelper.ts";
import store from "../../utils/Store.ts";

class Login extends Block {
  constructor() {
    const page_title = new PageTitle({ title: "Вход" });
    const input_field_login = new InputField({
      className: "login-page__input",
      title: "Логин",
      name: "login",
    });
    const input_field_password = new InputField({
      className: "login-page__input",
      title: "Пароль",
      name: "password",
      type: "password",
    });
    const button = new Button({
      text: "Авторизоваться",
      page: "settings",
      type: "submit",
    });
    const link = new Link({
      url: "/sign-up",
      text: "Нет аккаунта?",
      page: "register",
    });

    super({
      page_title,
      input_field_login,
      input_field_password,
      button,
      link,
    });
  }

  render() {
    return template;
  }
}

class LoginPage extends Block {
  constructor(props: any) {
    const data = store.getState();
    if (data.user) {
      router.go("/messenger");
      return;
    }
    const login = new Login();

    const dialogContent = new Dialog({
      content: [login],
    });

    const content = new Main({
      content: dialogContent,
    });

    function handleSubmit(event: Event) {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const authData: AuthData = {
        login: data.login as string,
        password: data.password as string,
      };
      handleUserAuthAndGo(authData, event, "/messenger");
    }

    super({
      ...props,
      content,
      events: {
        submit: (event: Event) => handleSubmit(event),
      },
    });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(LoginPage);
