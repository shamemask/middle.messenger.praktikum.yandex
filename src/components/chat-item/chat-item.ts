import "./chat-item.scss";
import Block from "../../utils/Block";
import template from "./chat-item.hbs?raw";

export interface ChatItemProps {
  id: number;
  title: string;
  avatar: string | null;
  createdBy: number;
  unreadCount: number;
  lastMessage: string | null;
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
