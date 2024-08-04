import template from './profile.hbs?raw';
import './profile.scss';
import {Button, Hr, Image, InputWithLabel, Interface, Link, Main, PageTitle} from "../../components";
import {Block, BlockProps} from "../../utils/Block";
import {validateField, validateForm} from "../../utils/validator";


interface FormData {
  [key: string]: string;
}


class Profile extends Block<BlockProps> {
  constructor(props: BlockProps = {}) {
    const image = new Image({className: "profile-page__image", avatar: "../assets/opossum_1.png", alt: "opossum"});
    const page_title = new PageTitle({title: "Иван"});
    const email_with_label = new InputWithLabel({
      className: "profile-page__input",
      title: 'Почта',
      name: 'email',
      text: "Почта",
      placeholder: "pochta@yandex.ru"
    });
    const hr1 = new Hr({className: "profile-page__hr"})
    const login_with_label = new InputWithLabel({
      className: 'profile-page__input',
      title: 'Логин',
      name: 'login',
      text: "Логин",
      placeholder: "ivanivanov"
    });
    const hr2 = new Hr({className: "profile-page__hr"})
    const first_name_with_label = new InputWithLabel({
      className: 'profile-page__input',
      title: 'Имя',
      name: 'first_name',
      text: "Имя",
      placeholder: "Иван"
    });
    const hr3 = new Hr({className: "profile-page__hr"})
    const second_name_with_label = new InputWithLabel({
      className: 'profile-page__input',
      title: 'Фамилия',
      name: 'second_name',
      text: "Фамилия",
      placeholder: "Иванов"
    });
    const hr4 = new Hr({className: "profile-page__hr"})
    const display_name_with_label = new InputWithLabel({
      className: 'profile-page__input',
      title: 'Имя в чате',
      name: 'display_name',
      text: "Имя в чате",
      placeholder: "Иван",
    });
    const hr5 = new Hr({className: "profile-page__hr"})
    const phone_with_label = new InputWithLabel({
      className: 'profile-page__input',
      title: 'Телефон',
      name: 'phone',
      text: "Телефон",
      placeholder: "+7 (909) 967 30 30",
    });

    const _404 = new Link({className: "profile-page__link", url: '/404', text: "Изменить данные(404)", page: '404'});
    const hr6 = new Hr({className: "profile-page__hr"})
    const _5xx = new Link({className: "profile-page__link", url: '/5xx', text: "Изменить пароль(500)", page: '500'});
    const hr7 = new Hr({className: "profile-page__hr"})
    const login_link = new Button({
      className: "profile-page__link profile-page__red",
      text: "Выйти",
      page: 'login',
      type: "submit"
    });

    super({
      ...props,
      image,
      page_title,
      email_with_label,
      hr1,
      login_with_label,
      hr2,
      first_name_with_label,
      hr3,
      second_name_with_label,
      hr4,
      display_name_with_label,
      hr5,
      phone_with_label,
      _404,
      hr6,
      _5xx,
      hr7,
      login_link,
    });
  }

  render() {
    return template;
  }
}

class ProfilePage extends Block<{}> {
  constructor() {
    const profile = new Profile();

    const dialogContent = new Interface({
      content: profile
    });

    const content = new Main({
      content: dialogContent,
    });

    super({
      content, events: {
        submit: (event: Event) => this.handleSubmit(event),
        blur: (event: Event) => this.handleBlur(event),
      },
    });
  }

  handleBlur(event: Event) {
    const {name, value} = event.target as HTMLInputElement;
    validateField(name, value);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: FormData = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    const isValid = validateForm(data);

    if (isValid) {
      console.log(data);
      window.location.href = '/';
    } else {
      console.log('Validation failed');
    }
  }


  render() {
    return '{{{ content }}}';
  }
}

export default ProfilePage;
