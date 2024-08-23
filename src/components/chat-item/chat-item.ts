import "./chat-item.scss";
import Block from "../../utils/Block";
import template from "./chat-item.hbs?raw";

export interface ChatItemProps {
  active: boolean;
  chatName: string;
  lastMessage: string;
}

class ChatItem extends Block {
  constructor(chatItemProps: ChatItemProps) {
    super(chatItemProps);
  }

  render() {
    return template;
  }
}

export default ChatItem;
