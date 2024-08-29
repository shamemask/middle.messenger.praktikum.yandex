import template from "./change-password.hbs?raw";
import "../settings.scss";
import { Interface, Main } from "../../../components";
import Block from "../../../utils/Block.ts";
import { showError, validateForm } from "../../../utils/validator.ts";
import { connect } from "../../../utils/Hoc.ts";
import router from "../../../utils/Router.ts";
import BackButton from "../../../components/back-button";
import AcceptButtons from "../accept-buttons/accept-buttons.ts";
import { ChangePasswordData, UsersAPI } from "../../../api/UsersAPI.ts";
import ChangePasswordInterface from "../change-password-interface/change-password-interface.ts";
import store from "../../../utils/Store.ts";

interface FormData {
  [key: string]: string;
}

export class ChangePassword extends Block {
  constructor(props: any) {
    const data = store.getState();
    if (!data.user) {
      router.go("/login");
      return;
    }

    const change_password_interface = new ChangePasswordInterface({
      first_name: data.user.first_name,
      avatar: data.user.avatar,
    });

    const accept_buttons = new AcceptButtons({
      accept_event: () => {
        // вызвать событие submit
        const form = document.querySelector("form.change-password");
        if (form) {
          const formData = new FormData(form as HTMLFormElement);
          const data: FormData = {};
          formData.forEach((value, key) => {
            data[key] = value as string;
          });

          const isValid = validateForm(data);

          if (isValid) {
            console.log(data);
            const changePasswordData: ChangePasswordData = {
              oldPassword: data.old_password,
              newPassword: data.new_password,
            };
            UsersAPI.changePassword(changePasswordData)
              .then((r) => {
                if (r instanceof Error) {
                  console.log(r.message);
                  showError("login", r.message);
                  return;
                } else {
                  console.log(r);
                  router.go("/settings");
                }
              })
              .catch((err) => {
                console.log(err);
                showError("old_password", JSON.parse(err.message).reason);
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
      change_password_interface,
      accept_buttons,
      back_button,
    });
  }

  render() {
    return template;
  }
}

class ChangePasswordPage extends Block {
  constructor() {
    const changePassword = new ChangePassword({});

    const dialogContent = new Interface({
      content: changePassword,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({
      content,
    });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(ChangePasswordPage);
