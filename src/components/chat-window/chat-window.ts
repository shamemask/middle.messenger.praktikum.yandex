import Block from "../../utils/Block";
import template from "./chat-window.hbs?raw";
import "./chat-window.scss";
import Message from "../message";
import { ChatInput } from "../index.ts";
import { MessageProps } from "../message/message.ts";

interface MessagesProps {
  messages: MessageProps[] | [];
}

class ChatWindow extends Block {
  constructor(props: MessagesProps) {
    const messages = props.messages.map((message) => {
      return new Message(message);
    });

    const chat_input = new ChatInput();

    super({ messages, chat_input });
  }

  render() {
    return template;
  }
}

export default ChatWindow;
