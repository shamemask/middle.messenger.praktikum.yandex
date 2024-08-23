import template from "./settings.hbs?raw";
import "../settings.scss";
import { Interface, Main } from "../../../components";
import Block from "../../../utils/Block.ts";
import { validateField, validateForm } from "../../../utils/validator.ts";
import { connect } from "../../../utils/Hoc.ts";
import router from "../../../utils/Router.ts";
import BackButton from "../../../components/back-button";
import SettingsInterface from "../settings-interface/settings-interface.ts";
import SettingsButtons from "../settings-buttons/settings-buttons.ts";

interface FormData {
  [key: string]: string;
}

export class Settings extends Block {
  constructor() {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    if (!data.login) {
      localStorage.removeItem("user");
      router.go("/login");
      return;
    }

    const settingsInterface = new SettingsInterface({
      login: data.login?.trim() || "",
      email: data.email?.trim() || "",
      first_name: data.first_name?.trim() || "",
      second_name: data.second_name?.trim() || "",
      display_name: data.display_name?.trim() || "",
      phone: data.phone?.trim() || "",
      avatar: data.avatar?.trim() || "",
      disabled: true,
    });

    const settings_button = new SettingsButtons();

    const back_button = new BackButton();

    super({
      settingsInterface,
      settings_button,
      back_button,
    });
  }

  render() {
    return template;
  }
}

class SettingsPage extends Block<{}> {
  constructor(props: any) {
    const settings = new Settings();

    const dialogContent = new Interface({
      content: settings,
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
      data[key] = value as string;
    });

    const isValid = validateForm(data);

    if (isValid) {
      console.log(data);
    } else {
      console.log("Validation failed");
    }
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(SettingsPage);
