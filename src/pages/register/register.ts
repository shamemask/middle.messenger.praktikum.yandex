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
    const page_title = new PageTitle({title: 'Регистрация'});
    const login_field = new InputField({className: 'register-page__input', title: 'Логин', name: 'login'});
    const first_name_field = new InputField({className: 'register-page__input', title: 'Имя', name: 'first_name'});
    const second_name_field = new InputField({
      className: 'register-page__input',
      title: 'Фамилия',
      name: 'second_name'
    });
    const phone_field = new InputField({className: 'register-page__input', title: 'Телефон', name: 'phone'});
    const password_field = new InputField({
      className: 'register-page__input',
      title: 'Пароль',
      name: 'password',
      type: 'password'
    });
    const repeat_password_field = new InputField({
      className: 'register-page__input',
      title: 'Повторите пароль',
      name: 'repeat_password',
      type: 'password'
    });
    const register_button = new Button({text: 'Зарегистрироваться', page: 'profile', type: "submit"});
    const login_link = new Link({url: '/login', text: 'Войти', page: 'login'});

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
  private password: String;

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

    super({
      ...props, content, events: {
        submit: (event) => this.handleSubmit(event), blur: (event) => this.handleBlur(event),
      },
    });
  }

  handleBlur(event) {
    const {name, value} = event.target;
    this.validateField(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const isValid = this.validateForm(data);

    if (isValid) {
      console.log(data);
      window.location.href = '/profile';
    } else {
      console.log('Validation failed');
    }
  }

  validateForm(data) {
    let isValid = true;
    Object.entries(data).forEach(([key, value]) => {
      if (!this.validateField(key, value)) {
        isValid = false;
      }
    });

    // Check password match
    if (data.password !== data.repeat_password) {
      this.showError('repeat_password', 'Passwords do not match');
      isValid = false;
    } else {
      this.hideError('repeat_password');
    }

    return isValid;
  }

  validateField(name, value) {
    const validators = {
      first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      login: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]{3,20})$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
      phone: /^\+?\d{10,15}$/,
      message: /.+/,
    };

    const regex = validators[name];
    if (regex) {
      const isValid = regex.test(value);
      if (!isValid) {
        this.showError(name, `Invalid ${name}`);
      } else {
        this.hideError(name);
      }
      return isValid;
    }

    return true;
  }

  showError(field, message) {
    const errorElement = document.querySelector(`#${field}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  hideError(field) {
    const errorElement = document.querySelector(`#${field}-error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  render() {
    return '{{{ content }}}';
  }
}

export default RegisterPage;
