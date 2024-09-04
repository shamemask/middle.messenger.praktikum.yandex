import "./chat-list.scss";
import Block from "../../utils/Block";
import template from "./chat-list.hbs?raw";
import { ChatItemProps } from "../chat-item/chat-item.ts";
import { ChatItem, CreateChatForm } from "../index.ts";
import { ChatsAPI, getChatsResponse } from "../../api/ChatsAPI.ts";
import store from "../../utils/Store.ts";

export interface ChatListProps {
  chatList: ChatItemProps[];
}

class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chat_form = new CreateChatForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const input = this.element!.querySelector(
            "input[name='title']",
          ) as HTMLInputElement;
          const title = input.value.trim();
          if (title) {
            ChatsAPI.createChat({ title })
              .then(
                (
                  chat,
                ): {
                  chats: Promise<getChatsResponse[]>;
                  activeChatId: number;
                } => {
                  console.log(`Chat ${title} created successfully`, chat.id);
                  alert(
                    `Chat ${title} created successfully with id ${chat.id}`,
                  );
                  store.setState({ chatList: [] });
                  store.setState({ activeChatId: chat.id });
                  // Обновление списка чатов после создания нового чата
                  return { chats: ChatsAPI.getChats(), activeChatId: chat.id };
                },
              )
              .then(({ chats, activeChatId }) => {
                store.setState({ activeChatId: activeChatId });
                store.setState({ chatList: chats });

                this.setProps({
                  chatList: chats,
                });
              })
              .catch((error) => {
                console.error("Failed to create chat:", error);
              });
          }
        },
      },
    });

    const chatList = props.chatList.map((chatItemProps: ChatItemProps) => {
      return new ChatItem(chatItemProps);
    });

    super({ chat_form, chatList });
  }

  render() {
    return template;
  }
}

export default ChatList;
