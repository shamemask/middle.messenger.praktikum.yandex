import "./chat-list.scss";
import Block from "../../utils/Block";
import template from "./chat-list.hbs?raw";
import { ChatItemProps } from "../chat-item/chat-item.ts";
import { ChatItem, CreateChatForm } from "../index.ts";

export interface ChatListProps {
  chatList: ChatItemProps[];
}

class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chat_form = new CreateChatForm();

    const chatList = props.chatList.map((chatItemProps: ChatItemProps) => {
      return new ChatItem(chatItemProps);
    });

    super({ chat_form, chatList });
  }

  render() {
    return template;
  }
}

export default ChatList;
