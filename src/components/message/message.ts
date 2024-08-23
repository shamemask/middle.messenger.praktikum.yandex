import Block from "../../utils/Block";
import template from "./message.hbs?raw";
import "./message.scss";
import Image from "../image";

interface MessageProps {
  reply?: boolean;
  time?: string;
  content: string;
  avatar?: string;
}

class Message extends Block {
  constructor(props: MessageProps) {
    const image = new Image({
      className: "message__image",
      src: props.avatar || "",
      alt: "Image",
    });
    super({ ...props, image });
  }

  render() {
    return template;
  }
}

export default Message;
