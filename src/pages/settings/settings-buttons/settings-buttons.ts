import template from "./settings-buttons.hbs?raw";
import { Button, Hr, Link } from "../../../components";
import Block from "../../../utils/Block.ts";
import router from "../../../utils/Router.ts";
import { AuthAPI } from "../../../api/AuthAPI.ts";

class SettingsButtons extends Block {
  constructor() {
    const change_data_button = new Link({
      className: "settings-page__link",
      text: "Изменить данные",
      url: "/change-data",
    });

    const hr6 = new Hr({ className: "settings-page__hr" });

    const change_password_button = new Link({
      className: "settings-page__link",
      text: "Изменить пароль",
      url: "/change-password",
    });

    const hr7 = new Hr({ className: "settings-page__hr" });

    const login_button = new Button({
      className: "settings-page__link settings-page__red",
      color: "red",
      text: "Выйти",
      type: "button",
      events: {
        click: (event: Event) => {
          localStorage.removeItem("user");
          AuthAPI.logout().then((r) => console.log(r));
          event.preventDefault();
          router.go("/login");
        },
      },
    });

    super({
      change_data_button,
      hr6,
      change_password_button,
      hr7,
      login_button,
    });
  }

  render() {
    return template;
  }
}

export default SettingsButtons;
