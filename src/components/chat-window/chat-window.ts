import Block from "../../utils/Block";
import template from "./chat-window.hbs?raw";
import "./chat-window.scss";
import Message from "../message";
import { ChatInput, ChatMenu } from "../index.ts";
import { MessageProps } from "../message/message.ts";
import store from "../../utils/Store.ts";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import WebSocketService from "../../api/WebSocketService.ts";

export interface MessagesChatProps {
  messages: MessageProps[] | [];
  chatId: number;
}

class ChatWindow extends Block {
  constructor(props: MessagesChatProps) {
    const chat_menu = new ChatMenu({
      chatId: props?.chatId,
    });

    const messages = props?.messages.map((message) => {
      return new Message(message);
    });

    const chat_input = new ChatInput();

    super({
      chat_menu,
      messages,
      chat_input,
      events: {
        click: (event: Event, chatId: number) =>
          this.sendMessage(event, chatId),
      },
    });
  }

  sendMessage(event: Event, chatId: number) {
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
      const content = {
        content: text.value,
        time: new Date().toLocaleTimeString(),
        id: store.getState().user.id,
        avatar: store.getState().user.avatar,
        author: store.getState().user.display_name,
        reply: true,
      };
      chatId = chatId ? chatId : store.getState().activeChatId;

      console.log(text);
      WebSocketService.send("message", content);
      text.value = "";
      text.focus();

      this.rebuildChat(chatId);
    }
  }

  public async rebuildChat(chatId: number) {
    await ChatInitializer.initChats(chatId);
    chatId = chatId ? chatId : store.getState().activeChatId;
    const chat_menu = new ChatMenu({
      chatId: chatId,
    });
    const messages = store.getState().messages || [];
    let currentMessages: MessagesChatProps;

    if (!messages) {
      currentMessages = {
        messages: [],
        chatId: chatId,
      };
    } else {
      currentMessages = messages.find(
        (message: MessagesChatProps) => message.chatId === chatId,
      );
    }
    let newMessages: Message[] = currentMessages?.messages.map(
      (message: MessageProps) => {
        return new Message(message);
      },
    );

    if (!newMessages) {
      newMessages = [];
    }

    this.setProps({
      chat_menu,
      messages: newMessages,
      chat_input: new ChatInput(),
      events: { click: (event: Event) => this.sendMessage(event, chatId) },
    });
  }

  render() {
    return template;
  }
}

export default ChatWindow;
