//@ts-nocheck
import Block from '../../utils/Block';
import template from './register.hbs?raw';
import './register.scss';

import Main from '../../components/main';
import Dialog from '../../components/dialog';
import PageTitle from '../../components/page-title';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Link from '../../components/link';

class Register extends Block {
  constructor(props: any = {}) {
    const page_title = new PageTitle({ title: 'Регистрация' });
    const login_field = new InputField({ className: 'register-page__input', title: 'Логин', name: 'login' });
    const first_name_field = new InputField({ className: 'register-page__input', title: 'Имя', name: 'first_name' });
    const second_name_field = new InputField({ className: 'register-page__input', title: 'Фамилия', name: 'second_name' });
    const phone_field = new InputField({ className: 'register-page__input', title: 'Телефон', name: 'phone' });
    const password_field = new InputField({ className: 'register-page__input', title: 'Пароль', name: 'password', type: 'password' });
    const repeat_password_field = new InputField({ className: 'register-page__input', title: 'Повторите пароль', name: 'repeat_password', type: 'password' });
    const register_button = new Button({ text: 'Зарегистрироваться', page: 'chat' });
    const login_link = new Link({ url: '/login', text: 'Войти', page: 'login' });

    super({
      ...props,
      page_title,
      login_field,
      first_name_field,
      second_name_field,
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

class RegisterPage extends Block {
  constructor(props: any) {
    const register = new Register();

    const dialogContent = new Dialog({
      content: [
        register
      ],
    });

    const content = new Main({
      content: dialogContent,
    });

    super({ ...props, content });
  }

  render() {
    return '{{{ content }}}';
  }
}

export default RegisterPage;
