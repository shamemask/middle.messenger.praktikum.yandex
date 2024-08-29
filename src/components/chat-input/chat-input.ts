import Block from "../../utils/Block";
import template from "./chat-input.hbs?raw";
import "./chat-input.scss";
import Input from "../input";

class ChatInput extends Block {
  constructor() {
    const input_search = new Input({
      className: "chat-input__element",
      type: "text",
      name: "chat-input",
      placeholder: "Поиск",
    });
    super({ input_search });
  }

  render() {
    return template;
  }
}

export default ChatInput;
