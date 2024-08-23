import "./chat-list.scss";
import Block from "../../utils/Block";
import template from "./chat-list.hbs?raw";
import { ChatItemProps } from "../chat-item/chat-item.ts";
import { ChatItem } from "../index.ts";

export interface ChatListProps {
  chatList: ChatItemProps[];
}

class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chatList = props.chatList.map((chatItemProps: ChatItemProps) => {
      return new ChatItem(chatItemProps);
    });

    super(chatList);
  }

  render() {
    return template;
  }
}

export default ChatList;
