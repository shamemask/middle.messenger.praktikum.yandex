import "./create-chat-form.scss";
import Block from "../../utils/Block";
import template from "./create-chat-form.hbs?raw";
import { ChatsAPI } from "../../api/ChatsAPI";
import store from "../../utils/Store";

class CreateChatForm extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => this.handleSubmit(event),
      },
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const input = this.element!.querySelector(
      "input[name='title']",
    ) as HTMLInputElement;
    const title = input.value.trim();
    if (title) {
      ChatsAPI.createChat({ title })
        .then(() => {
          console.log("Chat created successfully");
          // Обновление списка чатов после создания нового чата
          return ChatsAPI.getChats();
        })
        .then((chats) => {
          store.setState({ chats });
        })
        .catch((error) => {
          console.error("Failed to create chat:", error);
        });
    }
  }

  render() {
    return template;
  }
}

export default CreateChatForm;
