import template from "./settings-interface.hbs?raw";
import { Hr, Image, InputWithLabel, PageTitle } from "../../../components";
import Block from "../../../utils/Block.ts";

interface SettingsProps {
  login?: string;
  email?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  avatar?: string;
  error?: string;
  disabled?: boolean;
}

class SettingsInterface extends Block {
  constructor(settingsData: SettingsProps) {
    const image = new Image({
      className: "settings-page__image",
      // avatar: "../assets/opossum_1.png",
      src: settingsData.avatar || "",
      alt: "opossum",
    });

    const page_title = new PageTitle({ title: settingsData.first_name || "" });

    const email_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Почта",
      name: "email",
      text: "Почта",
      value: settingsData.email,
      placeholder: "pochta@yandex.ru",
      disabled: settingsData.disabled,
    });

    const hr1 = new Hr({ className: "settings-page__hr" });

    const login_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Логин",
      name: "login",
      text: "Логин",
      value: settingsData.login,
      // placeholder: "ivanivanov",
      disabled: settingsData.disabled,
    });

    const hr2 = new Hr({ className: "settings-page__hr" });

    const first_name_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Имя",
      name: "first_name",
      text: "Имя",
      value: settingsData.first_name,
      // placeholder: "Иван",
      disabled: settingsData.disabled,
    });

    const hr3 = new Hr({ className: "settings-page__hr" });

    const second_name_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Фамилия",
      name: "second_name",
      text: "Фамилия",
      value: settingsData.second_name,
      // placeholder: "Иванов",
      disabled: settingsData.disabled,
    });

    const hr4 = new Hr({ className: "settings-page__hr" });

    const display_name_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Имя в чате",
      name: "display_name",
      text: "Имя в чате",
      value: settingsData.display_name,
      // placeholder: "Иван",
      disabled: settingsData.disabled,
    });

    const hr5 = new Hr({ className: "settings-page__hr" });
    const phone_with_label = new InputWithLabel({
      className: "settings-page__input",
      title: "Телефон",
      name: "phone",
      text: "Телефон",
      value: settingsData.phone,
      // placeholder: "+7 (909) 967 30 30",
      disabled: settingsData.disabled,
    });

    super({
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
    });
  }

  render() {
    return template;
  }
}

export default SettingsInterface;
