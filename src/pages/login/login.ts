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
import { AuthAPI } from "../../api/AuthAPI.ts";
import router from "../../utils/Router.ts";
import { showError } from "../../utils/validator.ts";

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
    console.log(template);
    return template;
  }
}

class LoginPage extends Block {
  constructor(props: any) {
    if (localStorage.getItem("user")) {
      router.go("/settings");
      return;
    }
    const login = new Login();

    const dialogContent = new Dialog({
      content: [login],
    });

    const content = new Main({
      content: dialogContent,
    });

    super({
      ...props,
      content,
      events: {
        submit: (event: Event) => this.handleSubmit(event),
      },
    });
  }

  saveUser(user: string | object | unknown) {
    if (typeof user === "string") {
      localStorage.setItem("user", user);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  saveUserGoSettings(user: string | object | unknown, event: Event) {
    this.saveUser(user);
    event.preventDefault();
    router.go("/settings");
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    AuthAPI.getUser().then((user) => {
      if (user instanceof Error) {
        AuthAPI.login({
          login: data.login,
          password: data.password,
        })
          .then(() => {
            // После успешной авторизации пытаемся получить данные о пользователе
            return AuthAPI.getUser();
          })
          .then((userInfo) => {
            console.log(userInfo); // Обработка данных о пользователе
            this.saveUserGoSettings(userInfo, event);
          })
          .catch((error) => {
            console.error("Error:", error); // Обработка ошибок
            showError("login", error.message);
            return;
          });
      } else {
        console.log(user);
        this.saveUserGoSettings(user, event);
      }
    });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(LoginPage);
