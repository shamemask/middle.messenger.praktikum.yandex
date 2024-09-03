import Block from "../../utils/Block";
import template from "./chat-page.hbs?raw";
import "./chat-page.scss";
import { ChatWindow, Interface, Main } from "../../components";
import Sidebar from "../../components/sidebar";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import store from "../../utils/Store.ts";
import { connect } from "../../utils/Hoc.ts";

class Chat extends Block {
  constructor(props: any = {}) {
    const chatList = store.getState().chatList || [];

    const sidebar = new Sidebar({ chatList });

    const messages = store.getState().messages || [];

    const chatId = store.getState().activeChatId;

    const chat_window = new ChatWindow({ messages, chatId: chatId });
    super({ ...props, sidebar, chat_window });
  }

  public static buildWindowSidebar(): {
    sidebar: Sidebar;
    chat_window: ChatWindow;
  } {
    const messages = store.getState().messages || [];
    const chatId = store.getState().activeChatId;
    let chat_window_list: { [key: string]: any } = {};
    if (messages.length) {
      chat_window_list = messages.reduce((acc: any, message: any) => {
        if (!acc[message.chatId]) {
          acc[message.chatId] = [];
        }
        acc[message.chatId].push(
          new ChatWindow({ messages: [message], chatId: message.chatId }),
        );
        return acc;
      });
    }

    const chatList = store.getState().chatList || [];

    chatList.map((chat: any) => {
      if (chat_window_list[chat.chatId]) {
        chat.chat_window = chat_window_list[chat.chatId][0];
      } else {
        chat.chat_window = new ChatWindow({
          messages: [],
          chatId: chat.chatId,
        });
      }
    });

    const chat_window = new ChatWindow({
      messages: messages,
      chatId: chatId,
    });

    const sidebar = new Sidebar({
      chatList,
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
