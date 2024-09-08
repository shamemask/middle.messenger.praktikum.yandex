import template from "./avatar-upload.hbs?raw";
import Block from "../../../utils/Block.ts";

import "./avatar-upload.scss";

class AvatarUpload extends Block {
  constructor() {
    super();
  }

  render() {
    return template;
  }
}

export default AvatarUpload;
