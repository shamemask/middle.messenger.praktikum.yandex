import Block from "../../utils/Block";
import template from "./chat-window.hbs?raw";
import "./chat-window.scss";

interface ContainerProps {
  content: Block;
}

class ChatWindow extends Block {
  constructor(props: ContainerProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default ChatWindow;
