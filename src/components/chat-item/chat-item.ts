import "./chat-item.scss";
import Block from "../../utils/Block";
import template from "./chat-item.hbs?raw";
import { ChatWindow } from "../index.ts";
import store from "../../utils/Store.ts";

export interface ChatItemProps {
  id: string;
  title: string;
  avatar: string | null;
  createdBy: number;
  unreadCount: number;
  lastMessage: string | null;
  active?: boolean;

  chat_window?: ChatWindow;
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          props.chat_window?.buildMessages(props.id);
          store.setState({ activeChatId: props.id });
          props.active = true;
        },
      },
    });
  }

  render() {
    return template;
  }
}

export default ChatItem;
