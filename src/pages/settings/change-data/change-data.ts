import template from "./change-data.hbs?raw";
import "../settings.scss";
import { Interface, Main } from "../../../components";
import Block from "../../../utils/Block.ts";
import { showError, validateForm } from "../../../utils/validator.ts";
import { connect } from "../../../utils/Hoc.ts";
import router from "../../../utils/Router.ts";
import BackButton from "../../../components/back-button";
import SettingsInterface from "../settings-interface/settings-interface.ts";
import AcceptButtons from "../accept-buttons/accept-buttons.ts";
import { ChangeProfileData, UsersAPI } from "../../../api/UsersAPI.ts";
import { saveUserGo } from "../../../utils/authHelper.ts";

interface FormData {
  [key: string]: string;
}

export class ChangeData extends Block {
  constructor(props: any) {
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
      disabled: false,
    });

    const accept_buttons = new AcceptButtons({
      accept_event: (event: Event) => {
        // вызвать событие submit
        const form = document.querySelector("form.change-data");
        if (form) {
          const formData = new FormData(form as HTMLFormElement);
          const data: FormData = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });

          const isValid = validateForm(data);

          if (isValid) {
            console.log(data);
            const changeProfileData: ChangeProfileData = {
              login: data.login,
              email: data.email,
              first_name: data.first_name,
              second_name: data.second_name,
              display_name: data.display_name,
              phone: data.phone,
            };
            UsersAPI.changeProfile(changeProfileData).then((r) => {
              if (r instanceof Error) {
                console.log(r.message);
                showError("login", r.message);
                return;
              } else {
                console.log(r);
                // localStorage.setItem("user", JSON.stringify(r));
                saveUserGo(r, event, "/settings");
              }
            });
          } else {
            console.log("Validation failed");
          }
        }
      },
      cancel_event: () => {
        router.go("/settings");
      },
    });

    const back_button = new BackButton();

    super({
      ...props,
      settingsInterface,
      accept_buttons,
      back_button,
    });
  }

  render() {
    return template;
  }
}

class ChangeDataPage extends Block<{}> {
  constructor(props: any) {
    const changeData = new ChangeData({});

    const dialogContent = new Interface({
      content: changeData,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({
      ...props,
      content,
    });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(ChangeDataPage);