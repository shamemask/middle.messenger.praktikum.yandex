import Block from "../../utils/Block";
import template from "./chat-page.hbs?raw";
import "./chat-page.scss";
import { ChatWindow, Interface, Main } from "../../components";
import Sidebar from "../../components/sidebar";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import store from "../../utils/Store.ts";
import { connect } from "../../utils/Hoc.ts";
import { MessagesChatProps } from "../../components/chat-window/chat-window.ts";

class Chat extends Block {
  constructor() {
    const chatList = store.getState().chatList || [];

    const messages = store.getState().messages || [];

    const chatId = store.getState().activeChatId;

    const currentMessages = messages.find(
      (message: MessagesChatProps) => message.chatId === chatId,
    );
    const chat_window = new ChatWindow(currentMessages);
    const sidebar = new Sidebar({
      chatList: chatList,
      chat_window: chat_window,
    });

    super({ sidebar, chat_window });
  }

  public static buildWindowSidebar(): {
    sidebar: Sidebar;
    chat_window: ChatWindow;
  } {
    const chatId = store.getState().activeChatId;

    const chatList = store.getState().chatList || [];

    const messages = store.getState().messages || [];
    const currentMessages = messages.find(
      (message: MessagesChatProps) => message.chatId === chatId,
    );

    const chat_window = new ChatWindow(currentMessages);
    const sidebar = new Sidebar({
      chatList: chatList,
      chat_window: chat_window,
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
