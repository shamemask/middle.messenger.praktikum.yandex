import Block from "../../utils/Block";
import template from "./chat-input.hbs?raw";
import "./chat-input.scss";
import Input from "../input";
import Button from "../button";

class ChatInput extends Block {
  constructor() {
    const input_search = new Input({
      className: "chat-input__element",
      type: "text",
      name: "chat-input",
      placeholder: "Поиск",
    });
    const input_button = new Button({
      className: "chat-input__button",
      type: "button",
      text: "➤",
    });
    super({ input_search, input_button });
  }

  render() {
    return template;
  }
}

export default ChatInput;
