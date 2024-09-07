import Block from "../../utils/Block";
import template from "./sidebar.hbs?raw";
import "./sidebar.scss";
import Profile from "../profile";
import Search from "../search";
import { ChatList } from "../index.ts";
import store from "../../utils/Store.ts";
import { ChatsAPI, getChatsResponse } from "../../api/ChatsAPI.ts";
import { ChatItemProps } from "../chat-item/chat-item.ts";
import chatWindow from "../chat-window";
import webSocketService from "../../api/WebSocketService.ts";
import { MessagesChatProps } from "../chat-window/chat-window.ts";
import { ChatInitializer } from "../../api/ChatInitializer.ts";

export interface SidebarProps {
  chatList: ChatItemProps[];
  chat_window: chatWindow;
}

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    const profile = new Profile();

    const search = new Search();

    const chatList = Sidebar.mappingChatList(props.chatList, props.chat_window);
    const chat_list = new ChatList({
      chatList,
    });

    super({
      profile,
      search,
      chat_list,
      events: {
        submit: (event: Event) => this.handleSubmit(event, props.chat_window),
      },
    });
  }

  public static mappingChatList(
    chatList: ChatItemProps[],
    chat_window: chatWindow,
  ) {
    return chatList.map((chat: ChatItemProps) => {
      chat.events = {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          const chat = target.closest("div") as HTMLElement;
          const chatId: number = Number(chat.getAttribute("with-id"));

          if (chat.classList.contains("chat-item__trash-bin")) {
            chat.parentElement?.remove();
            ChatsAPI.deleteChat({ chatId }).then(() => {
              store.setState({
                chatList: store
                  .getState()
                  .chatList.filter(
                    (chat: getChatsResponse) => chat.id !== chatId,
                  ),
                messages: store
                  .getState()
                  .messages.filter(
                    (message: MessagesChatProps) => message.chatId !== chatId,
                  ),
              });
              console.log(`Chat ${chatId} deleted`);
              alert(`Chat ${chatId} deleted`);
            });
            return;
          }
          store.setState({ activeChatId: chatId });
          document.querySelectorAll(".chat-item").forEach((item) => {
            item.classList.remove("active");
          });
          target.classList.add("active");
          webSocketService.close();
          chat_window.initChat(chatId);
        },
      };
      return chat;
    });
  }

  handleSubmit(event: Event, chat_window: chatWindow) {
    console.log("submit");
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input[name='title']") as HTMLInputElement;
    const title = input.value.trim();
    if (title) {
      ChatsAPI.createChat({ title })
        .then((chat) => {
          console.log(`Chat ${title} created successfully`, chat.id);
          alert(`Chat ${title} created successfully with id ${chat.id}`);
          this.rebuildSidebar(chat_window);
        })
        .catch((error) => {
          console.error("Failed to create chat:", error);
        });
    }
  }

  public async rebuildSidebar(chat_window: chatWindow) {
    await ChatInitializer.initChats();
    const profile = new Profile();

    const search = new Search();

    const chatList = Sidebar.mappingChatList(
      store.getState().chatList || [],
      chat_window,
    );

    const chat_list = new ChatList({
      chatList: chatList,
    });
    this.setProps({
      profile,
      search,
      chat_list,
    });
  }

  render() {
    return template;
  }
}

export default Sidebar;
