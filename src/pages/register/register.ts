import template from "./register.hbs?raw";
import "./register.scss";
import {
  Button,
  Dialog,
  InputField,
  Link,
  Main,
  PageTitle,
} from "../../components";

import Block from "../../utils/Block";
import { showError, validateField, validateForm } from "../../utils/validator";
import { connect } from "../../utils/Hoc.ts";
import router from "../../utils/Router.ts";
import { AuthAPI } from "../../api/AuthAPI.ts";

interface FormData {
  [key: string]: string;
}

class Register extends Block {
  constructor() {
    const page_title = new PageTitle({ title: "Регистрация" });
    const login_field = new InputField({
      className: "register-page__input",
      title: "Логин",
      name: "login",
    });
    const first_name_field = new InputField({
      className: "register-page__input",
      title: "Имя",
      name: "first_name",
    });
    const second_name_field = new InputField({
      className: "register-page__input",
      title: "Фамилия",
      name: "second_name",
    });
    const email_field = new InputField({
      className: "register-page__input",
      title: "Email",
      name: "email",
    });
    const phone_field = new InputField({
      className: "register-page__input",
      title: "Телефон",
      name: "phone",
    });
    const password_field = new InputField({
      className: "register-page__input",
      title: "Пароль",
      name: "password",
      type: "password",
    });
    const repeat_password_field = new InputField({
      className: "register-page__input",
      title: "Повторите пароль",
      name: "repeat_password",
      type: "password",
    });
    const register_button = new Button({
      text: "Зарегистрироваться",
      page: "settings",
      type: "submit",
    });
    const login_link = new Link({
      url: "/login",
      text: "Войти",
      page: "login",
    });

    super({
      page_title,
      login_field,
      first_name_field,
      second_name_field,
      email_field,
      phone_field,
      password_field,
      repeat_password_field,
      register_button,
      login_link,
    });
  }

  render() {
    return template;
  }
}

class RegisterPage extends Block<{}> {
  constructor(props: any) {
    if (localStorage.getItem("user")) {
      router.go("/settings");
      return;
    }
    const register = new Register();

    const dialogContent = new Dialog({
      content: [register],
    });

    const content = new Main({
      content: dialogContent,
    });

    super({
      ...props,
      content,
      events: {
        submit: (event: Event) => this.handleSubmit(event),
        blur: (event: Event) => this.handleBlur(event),
      },
    });
  }

  handleBlur(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    validateField(name, value);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: FormData = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const isValid = validateForm(data);

    if (isValid) {
      AuthAPI.register({
        login: data.login,
        password: data.password,
        first_name: data.first_name,
        second_name: data.second_name,
        email: data.email,
        phone: data.phone,
      }).then((r) => {
        if (r instanceof Error) {
          console.log(r.message);
          showError("login", r.message);
          return;
        } else {
          console.log(r);
          localStorage.setItem("user", JSON.stringify(r));
          event.preventDefault();
          router.go("/messenger");
        }
      });
    } else {
      console.log("Validation failed");
    }
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(RegisterPage);
