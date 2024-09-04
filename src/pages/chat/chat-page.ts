import Block from "../../utils/Block";
import template from "./chat-page.hbs?raw";
import "./chat-page.scss";
import { ChatWindow, Interface, Main } from "../../components";
import Sidebar from "../../components/sidebar";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import store from "../../utils/Store.ts";
import { connect } from "../../utils/Hoc.ts";
import { ChatItemProps } from "../../components/chat-item/chat-item.ts";
import webSocketService from "../../api/WebSocketService.ts";

class Chat extends Block {
  constructor(props: any = {}) {
    const chatList = store.getState().chatList || [];

    const messages = store.getState().messages || [];

    const chatId = store.getState().activeChatId;
    const chat_window = new ChatWindow({ messages, chatId: chatId });
    const sidebar = new Sidebar({
      chatList: chatList.map((chat: ChatItemProps) => {
        chat.events = {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            const chatId: number = Number(target.getAttribute("with-id"));
            store.setState({ activeChatId: chatId });
            target.classList.add("active");
            chat_window.buildMessages(chatId);
          },
        };
        return chat;
      }),
    });

    super({ ...props, sidebar, chat_window });
  }

  public static buildWindowSidebar(): {
    sidebar: Sidebar;
    chat_window: ChatWindow;
  } {
    const chatId = store.getState().activeChatId;

    const chatList = store.getState().chatList || [];

    const messages = store.getState().messages || [];

    const chat_window = new ChatWindow({ messages, chatId: chatId });
    chatList.map((chat: ChatItemProps) => {
      chat.events = {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          const chatId: number = Number(target.getAttribute("with-id"));
          store.setState({ activeChatId: chatId });
          target.classList.add("active");
          webSocketService.close();
          chat_window.buildMessages(chatId);
        },
      };
      return chat;
    });

    const sidebar = new Sidebar({
      chatList: chatList,
    });

    return { sidebar, chat_window };
  }

  public async buildChats() {
    await ChatInitializer.initChats();
    const { sidebar, chat_window } = Chat.buildWindowSidebar();
    this.setProps({ sidebar, chat_window });
  }

  render() {
    return template;
  }
}

class ChatPage extends Block {
  constructor() {
    const chat = new Chat();

    const dialogContent = new Interface({
      className: "chat-page__interface",
      content: chat,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({ content });

    chat.buildChats();

    // this.setProps({
    //   content,
    // });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(ChatPage);
