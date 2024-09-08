import template from "./change-password-interface.hbs?raw";
import { Hr, Image, InputWithLabel, PageTitle } from "../../../components";
import Block from "../../../utils/Block.ts";

interface ChangePasswordInterfaceProps {
  avatar?: string;
  first_name?: string;
}

class ChangePasswordInterface extends Block {
  constructor(propsData: ChangePasswordInterfaceProps) {
    const image = new Image({
      className: "settings-page__image",
      // avatar: "../assets/opossum_1.png",
      src: propsData.avatar || "",
      alt: "opossum",
    });

    const page_title = new PageTitle({ title: propsData.first_name || "" });

    const old_password = new InputWithLabel({
      className: "settings-page__input",
      title: "Старый пароль",
      name: "old_password",
      text: "Старый пароль",
      type: "password",
      placeholder: "Старый пароль",
    });

    const hr1 = new Hr({ className: "settings-page__hr" });

    const new_password = new InputWithLabel({
      className: "settings-page__input",
      title: "Новый пароль",
      name: "new_password",
      text: "Новый пароль",
      type: "password",
      placeholder: "Новый пароль",
    });

    super({
      image,
      page_title,
      old_password,
      hr1,
      new_password,
    });
  }

  render() {
    return template;
  }
}

export default ChangePasswordInterface;
