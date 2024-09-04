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
  active?: boolean;
  events?: {
    click: (event: Event) => void;
  };
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
    });
  }

  render() {
    return template;
  }
}

export default ChatItem;
