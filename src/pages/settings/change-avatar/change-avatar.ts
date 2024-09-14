import template from "./change-avatar.hbs?raw";
import "../settings.scss";
import { Interface, Main } from "../../../components";
import Block from "../../../utils/Block.ts";
import { showError } from "../../../utils/validator.ts";
import { connect } from "../../../utils/Hoc.ts";
import BackButton from "../../../components/back-button";
import AcceptButtons from "../accept-buttons/accept-buttons.ts";
import { UsersAPI } from "../../../api/UsersAPI.ts";
import store from "../../../utils/Store.ts";
import ChangeAvatarInterface from "../change-avatar-interface/change-avatar-interface.ts";
import router from "../../../utils/activateRouter.ts";

export class ChangeAvatar extends Block {
  constructor() {
    const data = store.getState();
    if (!data.user) {
      router.go("/login");
      return;
    }

    const change_password_interface = new ChangeAvatarInterface({
      first_name: data.user.first_name,
      avatar: data.user.avatar,
    });

    const accept_buttons = new AcceptButtons({
      accept_event: (event: Event) => {
        const form = document.querySelector("form.change-avatar");
        const formData = new FormData(form as HTMLFormElement);

        const data: File = formData.get("avatar") as File;

        const formDataAvatar = new FormData();

        formDataAvatar.append("avatar", data);

        if (formDataAvatar) {
          event.preventDefault();

          console.log("FormData before submit:", formDataAvatar.get("avatar")); // Проверяем содержимое formData

          UsersAPI.changeAvatar(formData)
            .then((r) => {
              console.log(r);

              store.setState({
                // тернарный оператор: если r типа CompleteUserData, то вставить его в user, если нет, то вставить JSON.parse(r)
                user: r,
              });
              router.go("/settings");
            })
            .catch((err) => {
              console.log(err);
              showError("avatar_upload", JSON.parse(err.message).reason);
            });
        } else {
          console.log("Validation failed");
        }
      },
      cancel_event: () => {
        router.go("/settings");
      },
    });

    const back_button = new BackButton();

    super({
      change_password_interface,
      accept_buttons,
      back_button,
    });
  }

  render() {
    return template;
  }
}

class ChangeAvatarPage extends Block {
  constructor() {
    const changeAvatar = new ChangeAvatar();

    const dialogContent = new Interface({
      content: changeAvatar,
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

export default connect(ChangeAvatarPage);
