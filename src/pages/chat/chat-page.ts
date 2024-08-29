import Block from "../../utils/Block";
import template from "./chat-page.hbs?raw";
import "./chat-page.scss";
import { ChatWindow, Interface, Main } from "../../components";
import Sidebar from "../../components/sidebar";
import { ChatInitializer } from "../../api/ChatInitializer.ts";
import store from "../../utils/Store.ts";

class Chat extends Block {
  constructor(props: any = {}) {
    ChatInitializer.initChats();
    const chatList = store.getState().chatList || [];

    const sidebar = new Sidebar({ chatList });

    const messages = store.getState().messages || [];

    const chat_window = new ChatWindow({ messages });

    super({ ...props, sidebar, chat_window });
  }

  render() {
    return template;
  }
}

class ChatPage extends Block {
  constructor(props: any) {
    const chat = new Chat();

    const dialogContent = new Interface({
      content: chat,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({ ...props, content });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default ChatPage;
