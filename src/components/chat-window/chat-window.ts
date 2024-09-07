import Block from "../../utils/Block";
import template from "./chat-window.hbs?raw";
import "./chat-window.scss";
import Message from "../message";
import { ChatInput, ChatMenu } from "../index.ts";
import { MessageProps } from "../message/message.ts";
import store from "../../utils/Store.ts";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import WebSocketService, { MessageModel } from "../../api/WebSocketService.ts";
import { CompleteUserData } from "../../api/AuthAPI.ts";

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

    setTimeout(() => {
      chatId = chatId ? chatId : store.getState().activeChatId;
      const chat_menu = new ChatMenu({
        chatId: chatId,
      });
      const users = store.getState().users;
      const chats = store.getState().chats;
      let newMessages: Message[] = chats.map((message: MessageModel) => {
        const user = users?.find(
          (user: CompleteUserData) => user.id === message.user_id,
        );

        const result: MessageProps = {
          ...message,
          author: user?.display_name,
          avatar: user?.avatar,
          time: new Date(message.time).toLocaleTimeString(),
          reply: true,
          id: message.id,
        };
        return new Message(result);
      });

      if (!newMessages) {
        newMessages = [];
      }

      this.setProps({
        chat_menu,
        messages: newMessages,
        chat_input: new ChatInput(),
        events: { click: (event: Event) => this.sendMessage(event, chatId) },
      });
    }, 1000);
  }

  render() {
    return template;
  }
}

export default ChatWindow;
