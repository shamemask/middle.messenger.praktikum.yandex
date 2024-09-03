import Block from "../../utils/Block";
import template from "./chat-window.hbs?raw";
import "./chat-window.scss";
import Message from "../message";
import { ChatInput, ChatMenu } from "../index.ts";
import { MessageProps } from "../message/message.ts";
import store from "../../utils/Store.ts";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import WebSocketService from "../../api/WebSocketService.ts";

interface MessagesProps {
  messages: MessageProps[] | [];
  chatId: number;
}

class ChatWindow extends Block {
  constructor(props: MessagesProps) {
    if (!props.messages) {
      props.messages = [];
    }
    const chat_menu = new ChatMenu({
      chatId: props.chatId,
    });

    const messages = props.messages.map((message) => {
      return new Message(message);
    });

    const chat_input = new ChatInput();

    super({
      chat_menu,
      messages,
      chat_input,
      events: {
        click: (event: Event) => this.sendMessage(event),
      },
    });
  }

  sendMessage(event: Event) {
    event.preventDefault();

    const button: HTMLElement | null =
      document.querySelector(".chat-input__svg");
    if (button?.contains(event.target as Node)) {
      const text = document.querySelector(
        ".chat-input input.input__element",
      ) as HTMLInputElement;
      store.setState({
        lastMessage: text.value,
      });
      const messages = store.getState().messages || [];
      store.setState({
        messages: [
          ...messages,
          {
            content: text.value,
            time: new Date().toLocaleTimeString(),
            id: store.getState().user.id,
            avatar: store.getState().user.avatar,
            author: store.getState().user.display_name,
            reply: true,
          },
        ],
      });
      console.log(text);
      WebSocketService.send("message", text.value);
      text.value = "";
      text.focus();

      this.buildMessages(store.getState().activeChatId);
    }
  }

  public async buildMessages(chatId: number) {
    await ChatInitializer.initChats(chatId);
    const chat_menu = new ChatMenu({
      chatId: chatId,
    });
    const messages = store.getState().messages || [];
    const newMessages = messages.map((message: MessageProps) => {
      return new Message(message);
    });
    this.setProps({
      chat_menu,
      messages: newMessages,
      chat_input: new ChatInput(),
      events: { click: (event: Event) => this.sendMessage(event) },
    });
  }

  render() {
    return template;
  }
}

export default ChatWindow;
