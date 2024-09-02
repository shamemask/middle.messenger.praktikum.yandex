import template from "./change-avatar-interface.hbs?raw";
import { Image, PageTitle } from "../../../components";
import Block from "../../../utils/Block.ts";
import AvatarUpload from "../avatar-upload/avatar-upload.ts";

interface ChangePasswordInterfaceProps {
  avatar?: string;
  first_name?: string;
}

class ChangeAvatarInterface extends Block {
  constructor(propsData: ChangePasswordInterfaceProps) {
    const image = new Image({
      className: "settings-page__image",
      // avatar: "../assets/opossum_1.png",
      src: propsData.avatar || "",
      alt: "opossum",
    });

    const page_title = new PageTitle({ title: propsData.first_name || "" });

    const avatar_upload = new AvatarUpload();

    super({
      image,
      page_title,
      avatar_upload,
    });
  }

  render() {
    return template;
  }
}

export default ChangeAvatarInterface;
