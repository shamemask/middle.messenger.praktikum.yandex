import Block from '../../utils/Block';
import template from './login.hbs?raw';
import './login.scss';
import {Button, Dialog, InputField, Link, Main, PageTitle} from "../../components";


class Login extends Block {
  constructor() {
    const page_title = new PageTitle({title: 'Вход'});
    const input_field_login = new InputField({className: 'login-page__input', title: 'Логин', name: 'login'});
    const input_field_password = new InputField({
      className: 'login-page__input',
      title: 'Пароль',
      name: 'password',
      type: 'password'
    });
    const button = new Button({text: 'Авторизоваться', page: 'profile'});
    const link = new Link({url: '/register', text: 'Нет аккаунта?', page: 'register'});

    super({page_title, input_field_login, input_field_password, button, link,});
  }

  render() {
    console.log(template)
    return template;
  }
}

class LoginPage extends Block {
  constructor() {
    const login = new Login();

    const dialogContent = new Dialog({
      content: [
        login
      ],
    });

    const content = new Main({
      content: dialogContent,
    });

    super({content});
  }

  render() {
    return '{{{ content }}}';
  }
}

export default LoginPage;
